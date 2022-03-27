<template>
  <div
    title="Feature not available yet"
    class="
      md:w-full
      flex flex-row
      gap-2
      md:hover:bg-gray-200 md:bg-opacity-80 md:hover:p-2 md:rounded-md
      transition-all
      bg-accent
      md:bg-transparent
      rounded-md
    "
  >
    <div
      class="
        flex
        w-8
        h-8
        md:w-10 md:h-10
        rounded-full
        aspect-square
        md:bg-accent
        text-white
        items-center
        justify-center
      "
    >
      <svg
        class="w-4 h-4 md:w-5 md:h-5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <div class="flex flex-col gap-0 flex-grow md:w-[20%] justify-center">
      <h1
        class="
          font-medium
          pr-4
          md:pr-0 md:flex-grow
          truncate
          text-white
          md:text-text
        "
      >
        Local
      </h1>
      <p class="text-gray-500 text-xs w-full hidden md:inline-block truncate">
        Sign in to sync
      </p>
    </div>
    <svg
      class="hidden md:inline-block"
      height="22"
      width="22"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 11.7848L13.5075 7.27725L12.4478 6.216L9 9.666L5.553 6.216L4.4925 7.2765L9 11.7848Z"
        fill="#797979"
      />
    </svg>
  </div>
</template>
