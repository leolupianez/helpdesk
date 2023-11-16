export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      reply: {
        Row: {
          created_at: string
          id: string
          text: string
          ticketid: string
          userid: string
        }
        Insert: {
          created_at?: string
          id: string
          text: string
          ticketid: string
          userid: string
        }
        Update: {
          created_at?: string
          id?: string
          text?: string
          ticketid?: string
          userid?: string
        }
        Relationships: [
          {
            foreignKeyName: "reply_ticketid_fkey"
            columns: ["ticketid"]
            isOneToOne: false
            referencedRelation: "ticket"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reply_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          }
        ]
      }
      staff: {
        Row: {
          email: string
          id: string
          staff_role: Database["public"]["Enums"]["staff_role_type"]
          username: string
        }
        Insert: {
          email: string
          id: string
          staff_role?: Database["public"]["Enums"]["staff_role_type"]
          username: string
        }
        Update: {
          email?: string
          id?: string
          staff_role?: Database["public"]["Enums"]["staff_role_type"]
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "staff_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      ticket: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          status: Database["public"]["Enums"]["ticket_status_type"] | null
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          name: string
          status?: Database["public"]["Enums"]["ticket_status_type"] | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          status?: Database["public"]["Enums"]["ticket_status_type"] | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      staff_role_type: "admin" | "support" | "manager"
      ticket_status_type: "new" | "in progress" | "done"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
