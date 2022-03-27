<template>
  <div
    :class="[$store.state.mobileWindow === 0 ? 'flex' : 'hidden']"
    class="
      md:border-r
      border-stroke
      select-none
      md:flex
      gap-2
      flex-col
      text-text
      flex-grow
      md:min-w-[20%] md:max-w-[20%]
      min-w-full
      py-4
    "
  >
    <div class="md:hidden">
      <h1 class="font-dm font-medium text-2xl px-5">Webnote</h1>
    </div>
    <div class="md:px-2 px-5 flex gap-1">
      <div
        class="
          flex
          h-12
          md:h-11
          gap-4
          md:gap-2
          items-center
          rounded-md
          flex-grow
          md:px-2
          px-5
          bg-gray-100
        "
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <input
          :value="$store.state.searchFilter"
          @input="$store.commit('SET_SEARCH_FILTER', $event.target.value)"
          class="flex-grow h-full w-[60%] bg-transparent outline-none"
          placeholder="Search..."
          type="text"
        />
        <profile-banner class="md:hidden" />
      </div>
      <div class="md:static fixed right-8 bottom-8">
        <button
          title="create new note [Ctrl-Alt-N]"
          @click="openCreateNoteModal()"
          class="
            bg-accent
            md:hover:bg-opacity-20
            md:bg-opacity-10
            md:text-accent
            md:h-11
            md:w-11
            text-white
            w-14
            h-14
            shadow-lg shadow-blue-200
            md:shadow-none
            rounded-md
            flex
            items-center
            justify-center
            cursor-default
          "
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4V20M20 12L4 12"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- mobile tab -->
    <div class="md:hidden h-12 border-b-2 border-gray-200">
      <div class="flex justify-around gap-1">
        <div
          @click="setNoteListMode('notes')"
          :class="{ 'quick-link-active': appmode.noteslistmode == 'notes' }"
          class="quick-link font-poppins"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.75 15.75H3.75C2.92157 15.75 2.25 15.0784 2.25 14.25V3.75C2.25 2.92157 2.92157 2.25 3.75 2.25H14.25C15.0784 2.25 15.75 2.92157 15.75 3.75V9.75C15.7497 9.75867 15.7482 9.76724 15.7455 9.7755C15.7434 9.78235 15.7418 9.78938 15.741 9.7965C15.7368 9.86264 15.7239 9.92794 15.7028 9.99075L15.696 10.011C15.691 10.0279 15.6847 10.0445 15.6772 10.0605C15.6409 10.1422 15.5901 10.2167 15.5273 10.2802L10.2773 15.5303C10.1374 15.6702 9.94786 15.7492 9.75 15.75ZM3.75 3.75V14.25H9V9.75C9 9.33579 9.33579 9 9.75 9H14.25V3.75H3.75ZM10.5 10.5V13.1903L13.1895 10.5H10.5Z"
              fill="currentColor"
            />
          </svg>
          <p class="text-xs">Notes</p>
        </div>

        <div
          @click="setNoteListMode('favorites')"
          :class="{ 'quick-link-active': appmode.noteslistmode == 'favorites' }"
          class="quick-link font-poppins"
        >
          <svg
            width="22"
            height="22"
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

          <p class="text-xs">Favorite</p>
        </div>

        <div
          @click="setNoteListMode('shared')"
          :class="{ 'quick-link-active': appmode.noteslistmode == 'shared' }"
          class="quick-link font-poppins"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.3713 7.62868C9.19975 6.45711 7.30025 6.45711 6.12868 7.62868L3.12868 10.6287C1.95711 11.8003 1.95711 13.6997 3.12868 14.8713C4.30025 16.0429 6.19975 16.0429 7.37132 14.8713L8.19749 14.0451M7.62868 10.3713C8.80025 11.5429 10.6997 11.5429 11.8713 10.3713L14.8713 7.37132C16.0429 6.19975 16.0429 4.30025 14.8713 3.12868C13.6997 1.95711 11.8003 1.95711 10.6287 3.12868L9.80397 3.95339"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <p class="text-xs">Shared</p>
        </div>

        <div
          @click="setNoteListMode('trash')"
          :class="{ 'quick-link-active': appmode.noteslistmode == 'trash' }"
          class="quick-link font-poppins"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.25 5.25L13.5995 14.3569C13.5434 15.1418 12.8903 15.75 12.1033 15.75H5.89668C5.10972 15.75 4.45656 15.1418 4.40049 14.3569L3.75 5.25M7.5 8.25V12.75M10.5 8.25V12.75M11.25 5.25V3C11.25 2.58579 10.9142 2.25 10.5 2.25H7.5C7.08579 2.25 6.75 2.58579 6.75 3V5.25M3 5.25H15"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <p class="text-xs">Trash</p>
        </div>
      </div>
    </div>

    <search-banner
      v-if="$store.state.searchFilter.trim().length > 0"
      :searchTag="$store.state.searchFilter.trim()"
    />

    <!-- new-note -->

    <div
      :class="{
        'h-0': !new_note_modal_visible,
        'border p-4': new_note_modal_visible,
      }"
      class="
        fixed
        md:static
        bg-white
        transition-all
        duration-200
        rounded-md
        overflow-clip
        border-stroke
        flex flex-col
        md:gap-2
        gap-6
        mx-0
        top-0
        right-0
        bottom-0
        left-0
        md:mx-2
      "
    >
      <div class="flex">
        <h3 class="flex-grow text-2xl md:text-sm text-text">New Note</h3>
        <button
          @click="
            (new_note_modal_visible = false), ($refs.noteTitleInput.value = '')
          "
          class="
            hover:bg-gray-300
            bg-gray-100
            w-6
            h-6
            flex
            items-center
            justify-center
            rounded-full
            text-gray-600
          "
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 18L18 6M6 6L18 18"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>

      <div class="flex flex-col">
        <p class="font-poppins md:text-base text-sm">Title</p>
        <input
          :disabled="!new_note_modal_visible"
          @keydown.esc="
            (new_note_modal_visible = false), ($refs.noteTitleInput.value = '')
          "
          @keypress.enter="createNote"
          ref="noteTitleInput"
          type="text"
          placeholder="Note title..."
          name=""
          id=""
          class="
            px-3
            md:py-2
            py-3
            outline-accent
            rounded-md
            border-stroke border
          "
        />
      </div>

      <div class="flex-grow md:hidden" />

      <button
        @click="createNote"
        class="
          p-3
          bg-accent
          rounded-md
          transition-col
          hover:md:bg-opacity-20
          md:text-accent
          text-white
          font-poppins
          md:bg-opacity-10
        "
      >
        Create
      </button>
    </div>

    <!-- ... -->

    <div
      class="
        text-text
        h-0
        scrollbar
        overflow-y-auto
        md:overflow-y-hidden
        hover:md:overflow-y-auto
        flex flex-col flex-grow
      "
    >
      <!-- item -->
      <template v-for="note in notes" :key="note.id || note.local_id">
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
            <p class="text-sm flex-grow text-gray-400">
              {{ prettyDate(note.last_edited) }}
            </p>

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
      <div
        v-if="notes.length === 0 && !new_note_modal_visible"
        class="flex-grow flex flex-col items-center justify-center gap-2"
      >
        <h1>No Note</h1>
        <p class="text-sm text-gray-500 hidden md:inline">
          You dont have any notes here
        </p>
        <button
          v-if="$store.state.appmode.noteslistmode === 'notes'"
          @click="openCreateNoteModal()"
          class="
            text-sm
            px-5
            rounded-md
            text-white
            py-1
            bg-accent
            hidden
            md:inline
          "
        >
          Create
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quick-link-active {
  @apply text-accent;
}

.quick-link {
  @apply flex justify-center flex-col items-center;
}
</style>

<script>
import { mapActions, mapState } from "vuex";
import { parseAgoFromDateObj } from "../../notes";
import { updateNote, deleteNote } from "../../store";
import SearchBanner from "../utils/SearchBanner.vue";
import ProfileBanner from "../user/ProfileBanner.vue";

export default {
  components: { SearchBanner, ProfileBanner },
  mounted() {
    this._keyListener = function (e) {
      const meta = e.ctrlKey || e.metaKey;
      if (e.key == "n" && meta && e.altKey) {
        e.preventDefault();
        this.openCreateNoteModal();
      }
    };
    document.addEventListener("keydown", this._keyListener.bind(this));
  },
  beforeDestroy() {
    document.addEventListener("keydown", this._keyListener);
  },
  computed: {
    notes() {
      return this.$store.getters.getNotes;
    },
    new_note_modal_visible: {
      get() {
        return this.$store.state.appmode.newnotemodalvisible;
      },
      set(value) {
        this.$store.commit("SET_NEW_NOTE_MODAL", value);
      },
    },
    ...mapState({
      appmode: (state) => state.appmode,
    }),
  },
  methods: {
    ...mapActions(["setActiveNote", "setNoteListMode"]),
    updateNote,
    delNote(note) {
      deleteNote(this.$store.state, note);
    },
    createNote() {
      const input = this.$refs.noteTitleInput;
      const title = input.value.trim();
      if (title) {
        input.value = "";
        this.new_note_modal_visible = false;
        this.$store.dispatch("newNote", title);
      }
    },
    prettyDate: (time) => parseAgoFromDateObj(time),
    openCreateNoteModal() {
      this.$store.commit("SET_NEW_NOTE_MODAL", true);
      this.$refs.noteTitleInput.disabled = false;
      this.$refs.noteTitleInput?.focus();
    },
  },
};
</script>