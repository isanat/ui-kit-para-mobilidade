'use client'

import {
  ArrowLeft,
  Check,
  CheckCheck,
  Image as ImageIcon,
  MapPin,
  Navigation,
  Phone,
  Send,
  AlertCircle,
  MessageSquare,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { EerState, EerSkeleton } from '../../state'
import { formatRelativeTime } from '@/lib/mock/data'
import type { PatternProps } from '../types'

// ── Conversation participants ──
// Sarah = passenger (the current user). Michael = driver (the other party).
const driver = {
  name: 'Michael Thompson',
  initials: 'MT',
  vehicle: 'Cadillac Escalade · Black',
  plate: 'NYC-4821',
  rating: 4.9,
}

// ── Mock conversation ──
type MsgKind = 'text' | 'location' | 'image'
interface ChatMessage {
  id: string
  from: 'me' | 'them' // 'me' = Sarah (passenger), 'them' = Michael (driver)
  kind: MsgKind
  text?: string
  caption?: string
  time: string // ISO
  status?: 'sent' | 'delivered' | 'read'
}

// Build timestamps relative to "now" so the demo feels alive.
const now = Date.now()
const minsAgo = (m: number) => new Date(now - m * 60000).toISOString()
const hrsAgo = (h: number) => new Date(now - h * 3600000).toISOString()

const mockMessages: ChatMessage[] = [
  {
    id: 'm1',
    from: 'them',
    kind: 'text',
    text: 'Hi Sarah! I just arrived at your pickup location. Black Escalade, plate NYC-4821.',
    time: hrsAgo(1),
    status: 'read',
  },
  {
    id: 'm2',
    from: 'me',
    kind: 'text',
    text: 'Great, I will be right out! Give me 2 minutes.',
    time: minsAgo(58),
    status: 'read',
  },
  {
    id: 'm3',
    from: 'them',
    kind: 'location',
    caption: 'Shared live location',
    text: 'My current position',
    time: minsAgo(55),
    status: 'read',
  },
  {
    id: 'm4',
    from: 'me',
    kind: 'text',
    text: 'Perfect, on my way down now.',
    time: minsAgo(52),
    status: 'read',
  },
  {
    id: 'm5',
    from: 'them',
    kind: 'image',
    caption: 'This is me — parked out front',
    time: minsAgo(50),
    status: 'read',
  },
  {
    id: 'm6',
    from: 'me',
    kind: 'text',
    text: 'I see you! Coming out the lobby doors now.',
    time: minsAgo(48),
    status: 'read',
  },
  {
    id: 'm7',
    from: 'them',
    kind: 'text',
    text: 'Sounds good. Safe walk over, take your time.',
    time: minsAgo(47),
    status: 'read',
  },
  {
    id: 'm8',
    from: 'me',
    kind: 'text',
    text: 'In the car now, thank you! Ready when you are.',
    time: minsAgo(44),
    status: 'delivered',
  },
]

// ── Header: gradient + avatar + online status ──
function ChatHeader({ onBack }: { onBack?: () => void }) {
  return (
    <div className="bg-gradient-to-br from-primary to-primary/80 px-4 pb-4 pt-10 text-primary-foreground">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          aria-label="Back"
          className="flex size-9 items-center justify-center rounded-full bg-white/15 transition-base hover:bg-white/20"
        >
          <ArrowLeft className="size-4" />
        </button>

        {/* Avatar with initials */}
        <div className="relative">
          <div className="flex size-11 items-center justify-center rounded-full bg-white/20 text-sm font-bold backdrop-blur-sm">
            {driver.initials}
          </div>
          {/* Online status dot */}
          <span className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full border-2 border-primary bg-success" />
        </div>

        {/* Name + vehicle info */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{driver.name}</p>
          <p className="truncate text-xs opacity-80">
            {driver.vehicle} · {driver.plate}
          </p>
        </div>

        {/* Call button */}
        <button
          aria-label="Call driver"
          className="flex size-9 items-center justify-center rounded-full bg-success text-success-foreground transition-base hover:bg-success/90"
        >
          <Phone className="size-4" />
        </button>
      </div>
    </div>
  )
}

// ── Timestamp separator ──
function TimestampSeparator({ iso }: { iso: string }) {
  return (
    <div className="my-3 flex items-center justify-center">
      <span className="rounded-full bg-muted px-3 py-1 text-[11px] font-medium text-muted-foreground">
        {formatRelativeTime(iso)}
      </span>
    </div>
  )
}

// ── Single message bubble ──
function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isMe = msg.from === 'me'
  return (
    <div className={cn('flex w-full', isMe ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'flex max-w-[78%] flex-col gap-1 rounded-2xl px-3 py-2 text-sm shadow-sm slide-up',
          isMe
            ? 'rounded-br-md bg-primary text-primary-foreground'
            : 'rounded-bl-md bg-card text-card-foreground border border-border',
        )}
      >
        {/* Text message */}
        {msg.kind === 'text' && <p className="leading-snug">{msg.text}</p>}

        {/* Location message */}
        {msg.kind === 'location' && (
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="flex items-center gap-3 py-0.5"
          >
            <div
              className={cn(
                'flex size-10 shrink-0 items-center justify-center rounded-lg',
                isMe ? 'bg-white/20' : 'bg-primary/10 text-primary',
              )}
            >
              <MapPin className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="font-medium leading-tight">{msg.caption}</p>
              <p
                className={cn(
                  'text-xs underline-offset-2',
                  isMe ? 'opacity-80' : 'text-primary',
                )}
              >
                Open in Maps →
              </p>
            </div>
          </a>
        )}

        {/* Image message (placeholder) */}
        {msg.kind === 'image' && (
          <div className="space-y-1.5">
            <div
              className={cn(
                'flex aspect-video w-full min-w-[180px] flex-col items-center justify-center gap-1.5 rounded-xl',
                isMe ? 'bg-white/15' : 'bg-muted/60',
              )}
            >
              <ImageIcon
                className={cn('size-7', isMe ? 'text-white/80' : 'text-muted-foreground')}
              />
              <span
                className={cn(
                  'text-[10px]',
                  isMe ? 'text-white/80' : 'text-muted-foreground',
                )}
              >
                Photo
              </span>
            </div>
            {msg.caption && (
              <p className="leading-snug">{msg.caption}</p>
            )}
          </div>
        )}

        {/* Footer: time + read receipt (only for sent messages) */}
        <div
          className={cn(
            'flex items-center justify-end gap-1 text-[10px]',
            isMe ? 'text-primary-foreground/70' : 'text-muted-foreground',
          )}
        >
          <span>{new Date(msg.time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
          {isMe && msg.status === 'read' && <CheckCheck className="size-3" />}
          {isMe && msg.status === 'delivered' && <Check className="size-3" />}
          {isMe && msg.status === 'sent' && <Check className="size-3" />}
        </div>
      </div>
    </div>
  )
}

// ── Typing indicator (3 animated dots) ──
function TypingIndicator() {
  return (
    <div className="flex w-full justify-start">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-border bg-card px-4 py-3 shadow-sm">
        <span
          className="size-2 rounded-full bg-muted-foreground/70 animate-bounce"
          style={{ animationDelay: '0ms' }}
        />
        <span
          className="size-2 rounded-full bg-muted-foreground/70 animate-bounce"
          style={{ animationDelay: '150ms' }}
        />
        <span
          className="size-2 rounded-full bg-muted-foreground/70 animate-bounce"
          style={{ animationDelay: '300ms' }}
        />
      </div>
    </div>
  )
}

// ── Input bar (location-share + text + send) ──
function ChatInputBar({
  value,
  onChange,
  onSend,
  onShareLocation,
}: {
  value: string
  onChange?: (v: string) => void
  onSend?: () => void
  onShareLocation?: () => void
}) {
  return (
    <div className="flex items-center gap-2 border-t border-border bg-card px-3 py-2.5 pb-safe">
      <button
        onClick={onShareLocation}
        aria-label="Share location"
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-base hover:bg-primary/15 active:scale-95"
      >
        <Navigation className="size-5" />
      </button>
      <Input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="Message Michael…"
        className="h-11 flex-1 rounded-full border-border bg-background px-4"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            onSend?.()
          }
        }}
      />
      <Button
        onClick={onSend}
        disabled={!value.trim()}
        size="icon"
        aria-label="Send message"
        className="size-10 shrink-0 rounded-full"
      >
        <Send className="size-4" />
      </Button>
    </div>
  )
}

// ── Loading skeleton ──
function ChatLoading() {
  return (
    <div className="flex flex-col">
      <ChatHeader />
      <div className="space-y-3 px-4 py-4">
        {/* Received bubble */}
        <div className="flex justify-start">
          <div className="max-w-[78%] space-y-2 rounded-2xl rounded-bl-md border border-border bg-card p-3">
            <EerSkeleton className="h-3 w-44" />
            <EerSkeleton className="h-3 w-32" />
            <EerSkeleton className="h-3 w-24" />
          </div>
        </div>
        {/* Sent bubble */}
        <div className="flex justify-end">
          <div className="max-w-[78%] space-y-2 rounded-2xl rounded-br-md bg-primary/15 p-3">
            <EerSkeleton className="h-3 w-40" />
            <EerSkeleton className="h-3 w-28" />
          </div>
        </div>
        <div className="flex justify-start">
          <EerSkeleton className="h-12 w-44 rounded-2xl rounded-bl-md" />
        </div>
        <div className="flex justify-end">
          <EerSkeleton className="h-10 w-32 rounded-2xl rounded-br-md" />
        </div>
        <div className="flex justify-start">
          <div className="space-y-2 rounded-2xl rounded-bl-md border border-border bg-card p-3">
            <EerSkeleton className="h-3 w-36" />
            <EerSkeleton className="h-3 w-24" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Empty state: no messages yet ──
function ChatEmpty({
  onGreet,
}: {
  onGreet?: (text: string) => void
}) {
  const suggestions = [
    'Hi! I just booked a ride with you.',
    "I'm at the pickup spot, where are you?",
    'How long until you arrive?',
  ]
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-8 text-center fade-in">
      <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <MessageSquare className="size-8" />
      </div>
      <div className="space-y-1">
        <h2 className="text-lg font-bold text-foreground">No messages yet</h2>
        <p className="max-w-xs text-sm text-muted-foreground">
          Say hello — your driver is ready to chat.
        </p>
      </div>
      <div className="w-full max-w-sm space-y-2">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => onGreet?.(s)}
            className="w-full rounded-xl border border-border bg-card p-3 text-left text-sm font-medium text-foreground transition-all-eer hover:border-primary/30 hover:shadow-sm active:scale-[0.99]"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Main pattern component ──
export function P8Chat({ state, onStateChange }: PatternProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages)
  const [draft, setDraft] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new messages / typing change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages, isTyping])

  // Show typing indicator in populated state after a short delay
  useEffect(() => {
    if (state !== 'populated') return
    const t = setTimeout(() => setIsTyping(true), 800)
    return () => clearTimeout(t)
  }, [state])

  const handleSend = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const newMsg: ChatMessage = {
      id: `m_${Date.now()}`,
      from: 'me',
      kind: 'text',
      text: trimmed,
      time: new Date().toISOString(),
      status: 'sent',
    }
    setMessages((prev) => [...prev, newMsg])
    setDraft('')

    // Simulate delivered → read
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === newMsg.id ? { ...m, status: 'delivered' } : m)),
      )
    }, 800)
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === newMsg.id ? { ...m, status: 'read' } : m)),
      )
      // Driver replies after read receipt
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        setMessages((prev) => [
          ...prev,
          {
            id: `m_${Date.now()}_reply`,
            from: 'them',
            kind: 'text',
            text: 'Got it — thanks for letting me know!',
            time: new Date().toISOString(),
            status: 'read',
          },
        ])
      }, 1800)
    }, 1800)
  }

  const handleShareLocation = () => {
    setMessages((prev) => [
      ...prev,
      {
        id: `m_${Date.now()}_loc`,
        from: 'me',
        kind: 'location',
        caption: 'Shared live location',
        text: 'My current position',
        time: new Date().toISOString(),
        status: 'sent',
      },
    ])
  }

  // ── Loading state ──
  if (state === 'loading') {
    return (
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <ChatLoading />
        </div>
        <div className="flex items-center gap-2 border-t border-border bg-card px-3 py-2.5 pb-safe">
          <EerSkeleton className="size-10 rounded-full" />
          <EerSkeleton className="h-11 flex-1 rounded-full" />
          <EerSkeleton className="size-10 rounded-full" />
        </div>
      </div>
    )
  }

  // ── Error state: connection lost ──
  if (state === 'error') {
    return (
      <div className="flex h-full flex-col">
        <ChatHeader />
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertCircle className="size-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-foreground">Connection lost</h2>
            <p className="max-w-xs text-sm text-muted-foreground">
              We can't reach the chat server. Check your internet and try again.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 border-t border-border bg-card px-3 py-2.5 pb-safe">
          <Button
            className="w-full rounded-full"
            onClick={() => {
              onStateChange?.('loading')
              setTimeout(() => onStateChange?.('populated'), 600)
            }}
          >
            Reconnect
          </Button>
        </div>
      </div>
    )
  }

  // ── Empty state: no messages ──
  if (state === 'empty') {
    return (
      <div className="flex h-full flex-col">
        <ChatHeader />
        <div className="flex flex-1 overflow-y-auto scrollbar-thin">
          <ChatEmpty
            onGreet={(text) => {
              setMessages([
                {
                  id: `m_${Date.now()}`,
                  from: 'me',
                  kind: 'text',
                  text,
                  time: new Date().toISOString(),
                  status: 'sent',
                },
              ])
              onStateChange?.('populated')
            }}
          />
        </div>
        <ChatInputBar
          value={draft}
          onChange={setDraft}
          onSend={() => handleSend(draft)}
          onShareLocation={handleShareLocation}
        />
      </div>
    )
  }

  // ── Populated & success: full conversation ──
  // success = N/A per spec; map to populated chat view
  return (
    <div className="flex h-full flex-col">
      <ChatHeader />
      <div
        ref={scrollRef}
        className="flex-1 space-y-2 overflow-y-auto scrollbar-thin bg-muted/30 px-3 py-4"
      >
        {/* Timestamp separator at top */}
        <TimestampSeparator iso={messages[0]?.time ?? new Date().toISOString()} />

        {messages.map((m, i) => {
          const prev = messages[i - 1]
          // Insert separator if more than 30 minutes between messages
          const showSeparator =
            prev &&
            new Date(m.time).getTime() - new Date(prev.time).getTime() > 30 * 60000
          return (
            <div key={m.id} className="space-y-2">
              {showSeparator && <TimestampSeparator iso={m.time} />}
              <MessageBubble msg={m} />
            </div>
          )
        })}

        {/* Typing indicator */}
        {isTyping && <TypingIndicator />}
      </div>

      <ChatInputBar
        value={draft}
        onChange={setDraft}
        onSend={() => handleSend(draft)}
        onShareLocation={handleShareLocation}
      />
    </div>
  )
}
