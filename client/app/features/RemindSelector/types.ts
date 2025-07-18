import { ListNoteTile } from '@/app/features/ListNote/types';
import { SingleNoteTile } from '@/app/features/SingleNote/types';

export interface ISearchNotesResponse {
    searchNotes: {
        singleNotes: SingleNoteTile[];
        listNotes: ListNoteTile[];
    }
}
