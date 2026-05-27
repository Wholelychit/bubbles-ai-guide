/**
 * Bubbles AI Guide
 *
 * Cloudflare Worker entry point for a safe, focused reading-coach chat app.
 */
import { Env, ChatMessage } from "./types";

const MODEL_ID = "@cf/meta/llama-3.1-8b-instruct-fp8";
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1200;

const SYSTEM_PROMPT = `
You are Bubbles AI, a calm and patient reading coach for ReadEasy30.

Your purpose:
- Help children, parents, adult beginners, ESL learners, and older learners practice reading.
- Use plain, kind language at about a Grade 2-6 level unless asked for a higher level.
- Keep answers short, clear, and encouraging.
- Help with short reading passages, vocabulary, comprehension questions, fluency practice, and helper tips.
- Encourage slow reading, rereading, and finding answers in the text.

Safety and focus rules:
- Do not pretend to diagnose reading problems or learning disabilities.
- Do not collect private personal information about a child.
- If a user needs medical, legal, or school-placement advice, suggest talking with a qualified professional.
- Stay focused on reading practice and learning support.

Lesson format when asked to create a lesson:
- Title
- Short reading passage
- 3 simple questions
- 3 vocabulary words with easy definitions
- 1 gentle challenge question
- Helper tip
`;

function jsonResponse(body: unknown, status = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"Cache-Control": "no-store",
		},
	});
}

function sanitizeMessages(input: unknown): ChatMessage[] {
	if (!Array.isArray(input)) return [];

	return input
		.filter((message): message is ChatMessage => {
			if (!message || typeof message !== "object") return false;
			const candidate = message as Partial<ChatMessage>;
			return (
				(candidate.role === "user" || candidate.role === "assistant") &&
				typeof candidate.content === "string" &&
				candidate.content.trim().length > 0
			);
		})
		.slice(-MAX_MESSAGES)
		.map((message) => ({
			role: message.role,
			content: message.content.slice(0, MAX_MESSAGE_LENGTH),
		}));
}

async function handleChat(request: Request, env: Env): Promise<Response> {
	if (request.method === "OPTIONS") {
		return new Response(null, {
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type",
			},
		});
	}

	if (request.method !== "POST") {
		return jsonResponse({ error: "Method not allowed" }, 405);
	}

	let payload: { messages?: unknown };
	try {
		payload = await request.json();
	} catch {
		return jsonResponse({ error: "Invalid JSON body" }, 400);
	}

	const messages = sanitizeMessages(payload.messages);
	if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
		return jsonResponse({ error: "Please send a user message." }, 400);
	}

	const stream = await env.AI.run(MODEL_ID, {
		messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
		stream: true,
	});

	return new Response(stream as ReadableStream, {
		headers: {
			"Content-Type": "text/event-stream; charset=utf-8",
			"Cache-Control": "no-cache, no-store, must-revalidate",
			Connection: "keep-alive",
			"X-Content-Type-Options": "nosniff",
		},
	});
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname === "/api/chat") {
			try {
				return await handleChat(request, env);
			} catch (error) {
				console.error("Bubbles AI chat error", error);
				return jsonResponse(
					{ error: "Bubbles had trouble answering. Please try again." },
					500,
				);
			}
		}

		return env.ASSETS.fetch(request);
	},
};
