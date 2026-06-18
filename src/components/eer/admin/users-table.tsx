import * as React from "react";
import { MoreHorizontal, Search, UserRound } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/eer/status-badge";
import type { Tone } from "@/components/eer/accents";

export type UserStatus = "Active" | "Suspended" | "Pending";

/** Tone map for user status. Suspended maps to a destructive Badge variant. */
export type UserStatusTone = Tone | "destructive";

export const userStatusTone: Record<UserStatus, UserStatusTone> = {
  Active: "success",
  Suspended: "destructive",
  Pending: "muted",
};

export interface UserRow {
  id: string;
  name: string;
  email: string;
  initials: string;
  phone: string;
  joined: string;
  totalRides: number;
  totalSpent: string;
  status: UserStatus;
}

const defaultUsers: UserRow[] = [
  {
    id: "usr-1",
    name: "Olivia Bennett",
    email: "olivia.bennett@gmail.com",
    initials: "OB",
    phone: "+1 (617) 555-0148",
    joined: "Jan 04, 2024",
    totalRides: 84,
    totalSpent: "$1,612.50",
    status: "Active",
  },
  {
    id: "usr-2",
    name: "Daniel Cho",
    email: "daniel.cho@outlook.com",
    initials: "DC",
    phone: "+1 (617) 555-0193",
    joined: "Feb 19, 2024",
    totalRides: 51,
    totalSpent: "$982.20",
    status: "Active",
  },
  {
    id: "usr-3",
    name: "Maria Hernandez",
    email: "m.hernandez@protonmail.com",
    initials: "MH",
    phone: "+1 (617) 555-0110",
    joined: "Mar 28, 2024",
    totalRides: 12,
    totalSpent: "$214.75",
    status: "Pending",
  },
  {
    id: "usr-4",
    name: "James O'Connor",
    email: "james.oconnor@gmail.com",
    initials: "JO",
    phone: "+1 (617) 555-0172",
    joined: "Nov 12, 2023",
    totalRides: 168,
    totalSpent: "$3,420.00",
    status: "Suspended",
  },
  {
    id: "usr-5",
    name: "Aaliyah Washington",
    email: "aaliyah.w@icloud.com",
    initials: "AW",
    phone: "+1 (617) 555-0186",
    joined: "Apr 02, 2024",
    totalRides: 37,
    totalSpent: "$706.40",
    status: "Active",
  },
];

function UserStatusBadge({ status }: { status: UserStatus }) {
  const tone = userStatusTone[status];
  if (tone === "destructive") {
    return (
      <Badge variant="destructive" className="rounded-full">
        {status}
      </Badge>
    );
  }
  return (
    <StatusBadge tone={tone} dot={status === "Active"}>
      {status}
    </StatusBadge>
  );
}

interface UsersTableProps {
  users?: UserRow[];
  className?: string;
}

export function UsersTable({
  users = defaultUsers,
  className,
}: UsersTableProps) {
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone.toLowerCase().includes(q),
    );
  }, [users, query]);

  return (
    <Card className={cn("rounded-2xl", className)}>
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <UserRound className="size-4" aria-hidden />
          </span>
          <div className="leading-tight">
            <CardTitle className="text-base">Users</CardTitle>
            <CardDescription>{users.length} registered riders</CardDescription>
          </div>
        </div>
        <CardAction>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search
                className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search users…"
                aria-label="Search users"
                className="h-9 w-48 pl-8 text-sm"
              />
            </div>
            <Button variant="outline" size="sm">
              Filter
            </Button>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground px-6 text-xs tracking-wider uppercase">
                User
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Phone
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Joined
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Total rides
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Total spent
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Status
              </TableHead>
              <TableHead className="text-muted-foreground px-6 text-right text-xs tracking-wider uppercase">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((user) => (
              <TableRow
                key={user.id}
                className="border-border hover:bg-muted/50"
              >
                <TableCell className="px-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-9 ring-1 ring-border">
                      <AvatarFallback className="bg-primary/15 text-xs font-semibold text-primary">
                        {user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="leading-tight">
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-xs text-foreground/80">
                  {user.phone}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {user.joined}
                </TableCell>
                <TableCell className="font-mono text-foreground tabular-nums">
                  {user.totalRides.toLocaleString("en-US")}
                </TableCell>
                <TableCell className="font-mono font-medium text-foreground tabular-nums">
                  {user.totalSpent}
                </TableCell>
                <TableCell>
                  <UserStatusBadge status={user.status} />
                </TableCell>
                <TableCell className="px-6 text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-muted-foreground hover:text-foreground"
                    aria-label={`Actions for ${user.name}`}
                  >
                    <MoreHorizontal className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow className="border-border hover:bg-transparent">
                <TableCell
                  colSpan={7}
                  className="px-6 py-10 text-center text-sm text-muted-foreground"
                >
                  No users match &ldquo;{query}&rdquo;.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default UsersTable;
