<template>
  <syncable-model
    recurring
    fetch-on-mount
    saveToDB
    subject="fetch note list"
    :method="METHODS.POST"
    name="getNotes"
    v-slot="{ result }"
  >
    <template v-for="note in result" :key="note.id || note.local_id">
      <div
        v-if="note.title.includes($store.state.searchFilter?.trim())"
        @keydown.down="$refs.note_delegate[notes.indexOf(note) + 1]?.focus()"
        @keydown.up="$refs.note_delegate[notes.indexOf(note) - 1]?.focus()"
        ref="note_delegate"
        :class="[
          $store.state.notebook.activeNote == note.local_id
            ? 'bg-accent bg-opacity-0 md:bg-opacity-10'
            : 'bg-white',
          note.trash ? '' : 'hover:md:bg-gray-100',
        ]"
        :tabindex="0"
        @click="setActiveNote(note)"
        @keypress.enter="setActiveNote(note)"
        class="
          px-5
          md:px-2
          pt-2
          group
          flex flex-col
          gap-1
          md:gap-2
          outline-none
          focus:md:border-accent
          border-transparent border-l-2
          rounded-md
          md:rounded-none
        "
      >
        <h3 class="font-medium text-xl md:text-base break-all">
          {{ note.title }}
        </h3>
        <!-- <p class=" text-sm">But with some giudiance and explanation, we might get it right...</p> -->
        <div class="flex flex-row gap-3 items-center">
          <date-time :datetime="note.last_edited" v-slot="{ fuzzy }">
            <p class="text-sm flex-grow text-gray-400">
              {{ fuzzy }}
            </p>
          </date-time>

          <svg
            class="text-accent"
            v-if="note.favorite"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.23851 4.73851C1.9205 6.05653 1.9205 8.19347 3.23851 9.51149L9.00004 15.273L14.7615 9.51149C16.0795 8.19347 16.0795 6.05653 14.7615 4.73851C13.4435 3.4205 11.3065 3.4205 9.98851 4.73852L9.00004 5.72707L8.01149 4.73851C6.69347 3.4205 4.55653 3.4205 3.23851 4.73851Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <div
          v-if="note.trash"
          class="
            flex
            gap-2
            h-0
            overflow-clip
            group-focus:h-auto
            hover:h-auto
            group
          "
        >
          <button
            @click="delNote(note)"
            class="
              flex flex-grow
              py-2
              bg-danger
              hover:bg-red-500
              text-white
              justify-center
              items-center
              rounded-md
            "
          >
            Delete Permanetly
          </button>
          <button
            @click="updateNote(note, { trash: false })"
            class="
              flex flex-grow
              py-2
              bg-gray-100
              hover:bg-green-500 hover:text-white
              transition-colors
              duration-200
              text-text
              justify-center
              items-center
              rounded-md
            "
          >
            Restore
          </button>
        </div>
        <div />
      </div>
    </template>
  </syncable-model>
</template>

<script>
import { mapActions } from "vuex";
import { parseAgoFromDateObj } from "../notes";
import { updateNote, deleteNote } from "../store";
import SyncableModel, { METHODS } from "./SyncableModel.vue";
import DateTime from "../components/utils/DateTime.vue";

export default {
  data: () => ({ METHODS }),
  components: { SyncableModel, DateTime },
  computed: {
    notes() {
      return this.$store.getters.getNotes;
    },
  },
  methods: {
    ...mapActions(["setActiveNote", "setNoteListMode"]),
    updateNote,
    delNote(note) {
      deleteNote(this.$store.state, note);
    },
    prettyDate: (time) => parseAgoFromDateObj(time),
  },
};
</script>