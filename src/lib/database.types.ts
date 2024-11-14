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
      profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          email: string | null
          squadron: string | null
          created_at: string
        }
        Insert: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          squadron?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          squadron?: string | null
          created_at?: string
        }
      }
      board_applications: {
        Row: {
          id: number
          user_id: string
          position: 'president' | 'member'
          status: 'pending' | 'approved' | 'rejected'
          board_month: string
          board_year: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          position: 'president' | 'member'
          status?: 'pending' | 'approved' | 'rejected'
          board_month: string
          board_year: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          position?: 'president' | 'member'
          status?: 'pending' | 'approved' | 'rejected'
          board_month?: string
          board_year?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}