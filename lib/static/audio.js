const Static = require("../static");

class AudioStatic extends Static {
    constructor (client, params) {
        super(client, params);
    }

    getAudioAsObject (audio = []) {
        const source = this.UnmuskTokenAudio(audio[this.AudioObject.AUDIO_ITEM_INDEX_URL], this.user_id);
    
        const e = (audio[this.AudioObject.AUDIO_ITEM_INDEX_HASHES] || "").split("/"),
            c = (audio[this.AudioObject.AUDIO_ITEM_INDEX_COVER_URL] || ""),
            cl = c.split(",");
    
        const audio_ = {
            id: audio[this.AudioObject.AUDIO_ITEM_INDEX_ID],
            owner_id: audio[this.AudioObject.AUDIO_ITEM_INDEX_OWNER_ID],
            url: source || "",
            title: this.unescape(audio[this.AudioObject.AUDIO_ITEM_INDEX_TITLE]),
            performer: this.unescape(audio[this.AudioObject.AUDIO_ITEM_INDEX_PERFORMER]),
            duration: audio[this.AudioObject.AUDIO_ITEM_INDEX_DURATION],
            covers: c,
            is_restriction: audio[this.AudioObject.AUDIO_ITEM_INDEX_RESTRICTION],
            extra: audio[this.AudioObject.AUDIO_ITEM_INDEX_EXTRA],
            coverUrl_s: cl[0] || "",
            coverUrl_p: cl[1] || "",
            flags: audio[this.AudioObject.AUDIO_ITEM_INDEX_FLAGS],
            hq: !!(audio[this.AudioObject.AUDIO_ITEM_INDEX_FLAGS] & this.AudioObject.AUDIO_ITEM_HQ_BIT),
            claimed: !!(audio[this.AudioObject.AUDIO_ITEM_INDEX_FLAGS] & this.AudioObject.AUDIO_ITEM_CLAIMED_BIT),
            uma: !!(audio[this.AudioObject.AUDIO_ITEM_INDEX_FLAGS] & this.AudioObject.AUDIO_ITEM_UMA_BIT),
            album_id: audio[this.AudioObject.AUDIO_ITEM_INDEX_ALBUM_ID],
            full_id: `${audio[this.AudioObject.AUDIO_ITEM_INDEX_OWNER_ID]}_${audio[this.AudioObject.AUDIO_ITEM_INDEX_ID]}`,
            explicit: !!(audio[this.AudioObject.AUDIO_ITEM_INDEX_FLAGS] & this.AudioObject.AUDIO_ITEM_EXPLICIT_BIT),
            subtitle: this.unescape(audio[this.AudioObject.AUDIO_ITEM_INDEX_SUBTITLE]),
            add_hash: e[0] || "",
            edit_hash: e[1] || "",
            action_hash: e[2] || "",
            delete_hash: e[3] || "",
            replace_hash: e[4] || "",
            can_edit: !!e[1],
            can_delete: !!e[3],
            can_add: !!(audio[this.AudioObject.AUDIO_ITEM_INDEX_FLAGS] & this.AudioObject.AUDIO_ITEM_CAN_ADD_BIT),
            track_code: audio[this.AudioObject.AUDIO_ITEM_INDEX_TRACK_CODE],
            ads: audio[this.AudioObject.AUDIO_ITEM_INDEX_ADS],
            album: audio[this.AudioObject.AUDIO_ITEM_INDEX_ALBUM],
            replaceable: !!(audio[this.AudioObject.AUDIO_ITEM_INDEX_FLAGS] & this.AudioObject.AUDIO_ITEM_REPLACEABLE),
            context: audio[this.AudioObject.AUDIO_ITEM_INDEX_CONTEXT]
        };
    
        if (audio[9]) audio_.lyrics_id = audio[9];
        return audio_;
    }

    getAdi (audio) {
        const adi = [audio[1], audio[0]],
            e = audio[13].split("/");
    
        const actionHash = e[2] || "",
            otherHash  = e[5] || "";

        if (!actionHash || !otherHash) {
            return null;
        }
    
        adi[2] = actionHash;
        adi[3] = otherHash;
    
        return adi;
    }
}

module.exports = AudioStatic;