import {createWithEqualityFn} from "zustand/traditional";
import { persist } from "zustand/middleware";

import { DEFAULT_NOTE } from "@/constants";


export const useNotesStore = createWithEqualityFn<T_NotesStore>()(
  persist( (set) => ({

    notes: DEFAULT_NOTE,

    updateNotes: (notes:string) => {
      set({notes})
    }

  }),
  {
    name: 'store-widgets-notes'
  })
)