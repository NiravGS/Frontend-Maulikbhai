import {
    CREATE_ALBUM
} from "../../helpers/actions";

export const AlbumEvents = {
    create_album: (data) => ({ type: CREATE_ALBUM, data })
}