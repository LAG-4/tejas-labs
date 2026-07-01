"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { MarkdownText } from "@/components/markdown-text";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

const starterMessages: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Hi, I am Tejas, the Tejas Labs receptionist. Tell me what you want to build, and I will point you to the most relevant services, projects, and next step.",
  },
];

const STORAGE_KEY = "tejas-chat-history";
const HISTORY_MAX = 50;

const suggestions = [
  "I need an AI chatbot",
  "Can you build a SaaS MVP?",
  "Show relevant work",
];

function loadHistory(): ChatMessage[] {
  if (typeof window === "undefined") return starterMessages;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as ChatMessage[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore malformed/corrupted storage
  }
  return starterMessages;
}

function loadOpenState(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem("tejas-chat-open") === "1";
  } catch {
    return false;
  }
}

function newId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function ChatBubbleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="chatbot-fab-icon"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.4"
    >
      <path d="M5 6.8C5 5.25 6.25 4 7.8 4h8.4C17.75 4 19 5.25 19 6.8v5.4c0 1.55-1.25 2.8-2.8 2.8h-4.55L7.4 19v-4H7.8C6.25 15 5 13.75 5 12.2V6.8Z" />
      <path d="M9 9h6" />
      <path d="M9 12h3.5" />
    </svg>
  );
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState<boolean>(() => loadOpenState());
  const [messages, setMessages] = useState<ChatMessage[]>(() => loadHistory());
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const logRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    try {
      const trimmed = messages.slice(-HISTORY_MAX);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    } catch {
      // storage full or unavailable — non-fatal
    }
  }, [messages]);

  useEffect(() => {
    try {
      window.sessionStorage.setItem("tejas-chat-open", isOpen ? "1" : "0");
    } catch {
      // ignore
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
    inputRef.current?.focus();
  }, [isOpen, messages, isSending]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { id: newId(), role: "user", content: trimmed },
    ];

    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok || !data.reply) {
        throw new Error(data.error ?? "The receptionist is unavailable right now.");
      }

      setMessages((current) => [
        ...current,
        { id: newId(), role: "assistant", content: data.reply ?? "" },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSending(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function resetChat() {
    setMessages(starterMessages);
    setError("");
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  return (
    <div className="chatbot-shell">
      <section
        id="tejas-chatbot"
        className={`chatbot-panel ${isOpen ? "is-open" : ""}`}
        aria-label="Tejas Labs chat receptionist"
        aria-hidden={!isOpen}
      >
        <div className="chatbot-header">
          <div>
            <div className="chatbot-kicker">online receptionist</div>
            <h2>Ask Tejas</h2>
          </div>
          <button
            type="button"
            className="chatbot-icon-button"
            onClick={resetChat}
            aria-label="Clear chat history"
            title="Clear chat"
          >
            ↻
          </button>
          <button
            type="button"
            className="chatbot-icon-button"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
          >
            ×
          </button>
        </div>

        <div ref={logRef} className="chatbot-log" role="log" aria-live="polite">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chatbot-message ${message.role === "user" ? "from-user" : "from-bot"}`}
            >
              {message.role === "assistant" ? (
                <MarkdownText content={message.content} />
              ) : (
                message.content
              )}
            </div>
          ))}
          {isSending && (
            <div className="chatbot-message from-bot chatbot-thinking">
              <span />
              <span />
              <span />
            </div>
          )}
        </div>

        {messages.length === 1 && messages[0]?.id === "welcome" && (
          <div className="chatbot-suggestions" aria-label="Suggested prompts">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => void sendMessage(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {error && <p className="chatbot-error">{error}</p>}

        <form className="chatbot-form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask Tejas about your project..."
            aria-label="Message Tejas"
            maxLength={700}
            disabled={isSending}
          />
          <button type="submit" disabled={isSending || !input.trim()} aria-label="Send message">
            ↗
          </button>
        </form>
      </section>

      <button
        type="button"
        className={`chatbot-fab ${isOpen ? "is-open" : ""}`}
        onClick={() => setIsOpen((value) => !value)}
        aria-expanded={isOpen}
        aria-controls="tejas-chatbot"
        aria-label={isOpen ? "Hide Tejas chat" : "Open Tejas chat"}
      >
        <span className="chatbot-fab-mark">
          <ChatBubbleIcon />
        </span>
        <span className="chatbot-fab-text">Ask Tejas</span>
      </button>
    </div>
  );
}
