<template>
  <div class="flex-grow flex items-center flex-col gap-2 w-full">
    <!-- header -->
    <div
      class="
        flex
        px-2
        md:flex-row
        flex-col-reverse
        max-w-[700px]
        w-full
        lg:max-w-[750px]
        xl:max-w-[850px]
      "
    >
      <div class="flex flex-grow flex-col w-[70%]">
        <!-- ... -->
        <input
          v-model="noteTitle"
          class="
            w-full
            md:h-14
            h-10
            outline-accent
            text-2xl
            md:text-4xl
            font-bold
            flex-grow
          "
          v-if="noteseditmode"
          type="text"
          placeholder="Enter title..."
        />
        <h1
          v-else
          class="break-all md:text-4xl text-2xl w-full flex-grow font-medium"
        >
          {{ getActiveNote.title }}
        </h1>
        <!-- ... -->
        <div class="flex-grow">
          <div class="md:h-8 items-center flex gap-4">
            <p class="md:text-base text-xs select-none text-gray-700">
              {{ getActiveNote.author }}
            </p>
            <button
              v-if="noteseditmode"
              class="
                text-white
                bg-accent
                rounded-md
                flex
                items-center
                justify-center
                w-6
                h-6
              "
            >
              +
            </button>
          </div>
        </div>
      </div>
      <p
        v-if="!noteseditmode"
        class="
          flex-grow
          select-none
          md:text-sm
          text-xs
          md:text-right
          text-gray-600
        "
      >
        last edited {{ prettyDate(getActiveNote.last_edited) }}
      </p>
    </div>

    <!-- body -->
    <div
      class="
        px-2
        mt-1
        pb-6
        flex
        h-0
        flex-grow
        gap-2
        flex-col
        scrollbar
        overflow-y-auto
        w-full
        max-w-[700px]
        lg:max-w-[750px]
        xl:max-w-[850px]
      "
    >
      <template :key="item.id" v-for="item in getActiveNote.content">
        <!-- PARAGRAPH -->
        <template v-if="item.type === types.text_paragraph">
          <template v-if="noteseditmode">
            <textarea
              :value="item.text"
              rows="1"
              @click="
                resizeTextArea($event),
                  $store.commit('SET_CURRENT_CONTENT_ITEM', item.id)
              "
              @input="
                resizeTextArea($event),
                  updateContentItem(item.id, { text: $event.target.value })
              "
              placeholder="Enter text..."
              :class="[
                activeContentItem === item.id
                  ? 'border-accent'
                  : ' border-gray-200',
              ]"
              class="
                px-2
                scrollbar
                font-poppins
                outline-none
                border-2
                md:border-4
                rounded-md
                outline-2
                resize-none
              "
            />
          </template>
          <template v-else>
            <p>{{ item.text }}</p>
          </template>
        </template>

        <!-- LINK -->
        <template v-if="item.type === types.text_link">
          <template v-if="noteseditmode">
            <div class="flex gap-4">
              <div
                :class="[
                  activeContentItem === item.id
                    ? 'border-accent'
                    : ' border-gray-200',
                ]"
                class="
                  flex
                  rounded-md
                  gap-1
                  items-center
                  border-2
                  md:border-4
                  px-2
                "
              >
                <p class="mr-1 text-sm font-poppins">Display Text</p>
                <div
                  :class="[
                    activeContentItem === item.id
                      ? 'bg-accent'
                      : ' bg-gray-200',
                  ]"
                  class="w-[3px] h-[30px]"
                />
                <input
                  @input="
                    updateContentItem(item.id, { text: $event.target.value })
                  "
                  :value="item.text"
                  @click="$store.commit('SET_CURRENT_CONTENT_ITEM', item.id)"
                  class="ml-1 flex-grow outline-none"
                  type="text"
                  placeholder="enter display text..."
                />
              </div>
              <div
                :class="[
                  activeContentItem === item.id
                    ? 'border-accent'
                    : ' border-gray-200',
                ]"
                class="
                  flex flex-grow
                  rounded-md
                  gap-1
                  items-center
                  border-2
                  md:border-4
                  px-2
                "
              >
                <p class="mr-1 text-sm font-poppins">Url</p>
                <div
                  :class="[
                    activeContentItem === item.id
                      ? 'bg-accent'
                      : ' bg-gray-200',
                  ]"
                  class="w-[3px] h-[30px]"
                />
                <input
                  @input="
                    updateContentItem(item.id, { url: $event.target.value })
                  "
                  :value="item.url"
                  @click="$store.commit('SET_CURRENT_CONTENT_ITEM', item.id)"
                  class="ml-1 flex-grow outline-none"
                  type="url"
                  placeholder="enter url..."
                />
              </div>
            </div>
          </template>
          <template v-else>
            <div class="flex" v-if="item.text.length < 150">
              <a target="blank" :href="item.url" class="">
                <div
                  class="
                    px-3
                    py-2
                    rounded-md
                    bg-accent
                    flex flex-row
                    text-accent
                    bg-opacity-20
                    gap-1
                    hover:gap-2
                    transition-all
                    duration-200
                  "
                >
                  <p>{{ item.text }}</p>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 8L21 12M21 12L17 16M21 12L3 12"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </a>
            </div>
            <a
              target="blank"
              class="underline underline-offset-1 text-accent"
              :href="item.url"
              v-else
              >{{ item.text }}</a
            >
          </template>
        </template>

        <!-- HEADING -->
        <template v-if="item.type === types.text_heading">
          <template v-if="noteseditmode">
            <input
              :value="item.text"
              @click="$store.commit('SET_CURRENT_CONTENT_ITEM', item.id)"
              @input="updateContentItem(item.id, { text: $event.target.value })"
              placeholder="Enter text..."
              :class="[
                activeContentItem === item.id
                  ? 'border-accent'
                  : ' border-gray-200',
              ]"
              class="
                px-2
                py-1
                scrollbar
                font-poppins
                outline-none
                border-2
                md:border-4
                rounded-md
                outline-2
                resize-none
              "
            />
          </template>
          <template v-else>
            <div class="flex flex-col gap-3">
              <div />
              <h1 class="text-3xl font-medium">{{ item.text }}</h1>
              <div class="bg-stroke h-[1px]" />
            </div>
          </template>
        </template>

        <!-- CODE -->
        <template v-if="item.type === types.text_code">
          <template v-if="noteseditmode">
            <textarea
              :value="item.text"
              rows="1"
              @click="
                resizeTextArea($event),
                  $store.commit('SET_CURRENT_CONTENT_ITEM', item.id)
              "
              @input="
                resizeTextArea($event),
                  updateContentItem(item.id, { text: $event.target.value })
              "
              placeholder="Enter text..."
              :class="[
                activeContentItem === item.id
                  ? 'border-accent'
                  : ' border-gray-200',
              ]"
              class="
                px-2
                scrollbar
                font-poppins
                outline-none
                border-2
                md:border-4
                rounded-md
                outline-2
                resize-none
              "
            />
          </template>
          <template v-else>
            <highlightjs class="max-w-[100%]" autodetect :code="item.text" />
          </template>
        </template>

        <!-- IMAGE -->
        <template v-if="item.type === types.image">
          <template v-if="noteseditmode">
            <div
              :class="[
                activeContentItem === item.id
                  ? 'border-accent'
                  : ' border-gray-200',
              ]"
              class="flex rounded-md border-2 md:border-4"
            >
              <img
                class="rounded-l-md w-14 h-14 object-cover"
                :src="item.src"
                alt=""
              />
              <input
                @input="
                  updateContentItem(item.id, { src: $event.target.value })
                "
                @click="$store.commit('SET_CURRENT_CONTENT_ITEM', item.id)"
                :value="item.src"
                type="text"
                placeholder="image url"
                class="px-2 flex-grow outline-none"
              />
              <button
                title="upload local image (Note working. yet to implement backend)"
                @click="
                  $refs[`${item.id}_img_input`][0].click(),
                    $store.commit('SET_CURRENT_CONTENT_ITEM', item.id)
                "
                class="hover:text-accent px-4 rounded-r-md text-text"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 16C4.79086 16 3 14.2091 3 12C3 10.0929 4.33457 8.4976 6.12071 8.09695C6.04169 7.74395 6 7.37684 6 7C6 4.23858 8.23858 2 11 2C13.4193 2 15.4373 3.71825 15.9002 6.00098C15.9334 6.00033 15.9666 6 16 6C18.7614 6 21 8.23858 21 11C21 13.419 19.2822 15.4367 17 15.9M15 13L12 10M12 10L9 13M12 10L12 22"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
            <input
              :ref="`${item.id}_img_input`"
              class="hidden"
              type="file"
              name=""
              id=""
            />
          </template>
          <template v-else>
            <div class="relative bg-gray-200 h-max rounded-md">
              <img
                loading="lazy"
                @error="
                  $refs[`${item.id}_img_error`][0].style.display = 'inline'
                "
                @load="$refs[`${item.id}_img_load`][0].style.display = 'none'"
                class="
                  w-full
                  object-cover object-center
                  rounded-md
                  min-h-[100px]
                  max-h-[500px]
                "
                :src="item.src"
                alt=""
              />
              <!-- load -->
              <div
                :ref="`${item.id}_img_load`"
                class="
                  transition
                  delay-200
                  absolute
                  top-0
                  left-0
                  right-0
                  bottom-0
                "
              >
                <div class="w-full h-full flex items-center justify-center">
                  <div
                    class="
                      bg-white
                      shadow-lg
                      flex
                      gap-4
                      p-3
                      rounded-md
                      items-center
                      justify-center
                    "
                  >
                    <svg
                      class="animate-spin h-6 w-6 text-accent"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <p class="select-none text-sm">Loading image...</p>
                  </div>
                </div>
              </div>
              <!-- error -->
              <div
                :ref="`${item.id}_img_error`"
                class="
                  transition
                  delay-200
                  hidden
                  absolute
                  top-0
                  left-0
                  right-0
                  bottom-0
                "
              >
                <div class="w-full h-full flex items-center justify-center">
                  <div
                    class="
                      bg-white
                      shadow-lg
                      flex
                      gap-4
                      p-3
                      rounded-md
                      items-center
                      justify-center
                    "
                  >
                    <svg
                      class="text-danger h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.266 20.998H2.73301C2.37575 20.998 2.04563 20.8074 1.867 20.498C1.68837 20.1886 1.68838 19.8074 1.86701 19.498L11.133 3.49799C11.3118 3.1891 11.6416 2.9989 11.9985 2.9989C12.3554 2.9989 12.6852 3.1891 12.864 3.49799L22.13 19.498C22.3085 19.8072 22.3086 20.1882 22.1303 20.4975C21.9519 20.8069 21.6221 20.9976 21.265 20.998H21.266ZM12 5.99799L4.46901 18.998H19.533L12 5.99799ZM12.995 14.999H10.995V9.99799H12.995V14.999Z"
                        fill="currentColor"
                      />
                      <path d="M11 16H13V18H11V16Z" fill="currentColor" />
                    </svg>
                    <p class="select-none text-sm">Error fetching image!</p>
                    <button
                      class="pr-3"
                      @click="
                        updateContentItem(item.id, {
                          src: reloadImg(item.src),
                        }),
                          ($refs[`${item.id}_img_load`][0].style.display =
                            'inline'),
                          ($refs[`${item.id}_img_error`][0].style.display =
                            'none')
                      "
                    >
                      <svg
                        class="text-text hover:text-accent h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.995 4.00001C7.8362 3.99432 4.36664 7.17599 4.01299 11.3197C3.65933 15.4634 6.53955 19.187 10.6391 19.8862C14.7387 20.5853 18.6903 18.0267 19.73 14H17.649C16.6318 16.8771 13.617 18.5324 10.6434 17.8465C7.66989 17.1605 5.68488 14.3519 6.03079 11.3199C6.3767 8.28792 8.94332 5.99856 11.995 6.00001C13.5845 6.00234 15.1064 6.64379 16.218 7.78002L13 11H20V4.00001L17.649 6.35002C16.1527 4.84464 14.1175 3.99873 11.995 4.00001Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </template>

        <!-- LIST -->
        <template v-if="item.type === types.list">
          <template v-if="noteseditmode">
            <div
              :class="[
                activeContentItem === item.id
                  ? 'border-accent'
                  : ' border-gray-200',
              ]"
              class="border-2 md:border-4 p-2 rounded-md"
            >
              <!-- item component -->
              <div
                :key="subitem.id"
                v-for="subitem in item.items"
                class="
                  flex
                  gap-3
                  group
                  items-center
                  hover:bg-accent hover:bg-opacity-10
                  pl-2
                "
              >
                <!-- item -->
                <div class="flex flex-grow items-center gap-1">
                  <!-- indent -->
                  <div
                    :class="{
                      'w-[1.25rem]': subitem.indent == 1,
                      'w-[2.5rem]': subitem.indent == 2,
                      'w-[3.75rem]': subitem.indent == 3,
                      'w-[0px]': subitem.indent == 0,
                    }"
                    class="
                      bg-gray-200
                      h-[2px]
                      rounded-md
                      transition-all
                      duration-200
                    "
                  />
                  <!-- content -->
                  <div class="flex flex-grow gap-3 items-center">
                    <input
                      @click="
                        $store.commit('SET_CURRENT_CONTENT_ITEM', item.id)
                      "
                      class="flex-grow bg-transparent outline-none"
                      v-model="subitem.value"
                      type="text"
                      name=""
                      id=""
                    />
                  </div>
                </div>
                <!-- type -->
                <group-button
                  label=""
                  class="
                    group-hover:w-max
                    w-0
                    border-0
                    group-hover:border-2
                    overflow-x-clip
                  "
                >
                  <group-button-item
                    @click="subitem.listType = 'checklist'"
                    class="rounded-l-md"
                    :class="[
                      subitem.listType == 'checklist'
                        ? 'text-white bg-accent hover:bg-accent'
                        : 'bg-white text-text',
                    ]"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 19.411L12.3 16.711L13.714 15.295L15 16.583L20.008 11.583L21.419 13L15 19.41V19.411ZM11 17H2V15H11V17ZM15 13H2V11H15V13ZM15 9H2V7H15V9Z"
                        fill="currentColor"
                      />
                    </svg>
                  </group-button-item>
                  <group-button-item
                    @click="subitem.listType = 'normal'"
                    class="rounded-r-md"
                    :class="[
                      subitem.listType == 'normal'
                        ? 'text-white bg-accent hover:bg-accent'
                        : 'bg-white text-text',
                    ]"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 5H21V7H8V5ZM3 4.5H6V7.5H3V4.5ZM3 10.5H6V13.5H3V10.5ZM3 16.5H6V19.5H3V16.5ZM8 11H21V13H8V11ZM8 17H21V19H8V17Z"
                        fill="currentColor"
                      />
                    </svg>
                  </group-button-item>
                </group-button>
                <!-- control -->
                <group-button
                  class="
                    border-0
                    group-hover:border-2 group-hover:w-max
                    w-0
                    overflow-x-clip
                  "
                  label=""
                >
                  <group-button-item
                    class="bg-white"
                    @click="
                      swapListItem(item.items, subitem, -1),
                        $store.commit('SET_CURRENT_CONTENT_ITEM', item.id)
                    "
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.25 8.25L9 4.5M9 4.5L12.75 8.25M9 4.5V13.5"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </group-button-item>
                  <group-button-item
                    class="bg-white"
                    @click="
                      swapListItem(item.items, subitem, 1),
                        $store.commit('SET_CURRENT_CONTENT_ITEM', item.id)
                    "
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.75 9.75L9 13.5M9 13.5L5.25 9.75M9 13.5L9 4.5"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </group-button-item>
                  <group-button-item
                    class="bg-white"
                    @click="
                      (subitem.indent =
                        subitem.indent > 0 ? subitem.indent - 1 : 0),
                        $store.commit('SET_CURRENT_CONTENT_ITEM', item.id)
                    "
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.25 12.75L4.5 9M4.5 9L8.25 5.25M4.5 9L13.5 9"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </group-button-item>
                  <group-button-item
                    class="bg-white"
                    :stroke="false"
                    @click="
                      (subitem.indent =
                        subitem.indent < 3 ? subitem.indent + 1 : 3),
                        $store.commit('SET_CURRENT_CONTENT_ITEM', item.id)
                    "
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.75 5.25L13.5 9M13.5 9L9.75 12.75M13.5 9L4.5 9"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </group-button-item>
                </group-button>
              </div>

              <!-- new item -->
              <div class="flex bg-gray-200 gap-4 rounded-md">
                <input
                  @click="$store.commit('SET_CURRENT_CONTENT_ITEM', item.id)"
                  @keypress.enter="addListitem(item.items, $event.target)"
                  :ref="`${item.id}_new_listitem_input`"
                  placeholder="enter text..."
                  type="text"
                  name=""
                  class="px-3 py-2 bg-transparent outline-none flex-grow"
                />
                <button
                  @click="
                    addListitem(
                      item.items,
                      $refs[`${item.id}_new_listitem_input`][0]
                    ),
                      $store.commit('SET_CURRENT_CONTENT_ITEM', item.id)
                  "
                  class="
                    bg-accent bg-opacity-10
                    rounded-r-md
                    text-accent
                    hover:bg-opacity-100 hover:text-white
                    transition-all
                    duration-200
                    py-2
                    px-4
                  "
                >
                  add
                </button>
              </div>
            </div>
          </template>
          <template v-else>
            <div>
              <!-- item component -->
              <div
                :key="subitem.id"
                v-for="subitem in item.items"
                class="flex gap-3 group items-center"
              >
                <!-- item -->
                <div class="flex flex-grow items-center">
                  <!-- indent -->
                  <div
                    :class="{
                      'w-[1.25rem]': subitem.indent == 1,
                      'w-[2.5rem]': subitem.indent == 2,
                      'w-[3.75rem]': subitem.indent == 3,
                      'w-[0px]': subitem.indent == 0,
                    }"
                    class="h-[2px] rounded-md transition-all duration-200"
                  />
                  <!-- content -->
                  <div class="flex gap-3 h-8 items-center">
                    <!-- check state -->
                    <div
                      @click="subitem.checked = !subitem.checked"
                      v-if="subitem.listType == 'checklist'"
                      :class="[subitem.checked ? 'bg-accent' : 'bg-gray-300']"
                      class="
                        cursor-pointer
                        hover:p-[0.35rem]
                        transition-all
                        duration-200
                        p-1
                        h-max
                        rounded
                      "
                    >
                      <svg
                        :class="[
                          subitem.checked ? 'text-white' : 'text-transparent',
                        ]"
                        class=""
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 13L9 17L19 7"
                          stroke="currentColor"
                          stroke-width="6"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <!-- bullet -->
                    <div
                      v-if="subitem.listType == 'normal'"
                      class="w-2 h-2 rounded-full bg-text"
                    />
                    <p class="">{{ subitem.value }}</p>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </template>
      </template>
    </div>
  </div>
</template>

<style scoped>
textarea {
  @apply min-h-[100px];
}
</style>

<script>
import "highlight.js/lib/common";
import { mapState, mapGetters } from "vuex";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import GroupButton from "../controls/GroupButton.vue";
import GroupButtonItem from "../controls/GroupButtonItem.vue";
import { types, makeListItem, parseAgoFromDateObj } from "../../notes.js";

export default {
  data() {
    return {
      types,
    };
  },
  computed: {
    ...mapState({
      noteseditmode: (state) => state.appmode.noteseditmode,
      activeContentItem: (state) => state.notebook.activeContentItem,
    }),
    ...mapGetters(["getActiveNote"]),
    noteTitle: {
      get() {
        return this.getActiveNote.title;
      },
      set(value) {
        if (value.trim().length === 0) value = "Untitled";
        this.$store.commit("UPDATE_ACTIVE_NOTE", { title: value.trim() });
      },
    },
  },
  methods: {
    resizeTextArea(e) {
      const el = e.target;
      el.style.minHeight = "1px";
      el.style.minHeight = 10 + el.scrollHeight + "px";
    },
    updateContentItem(id, data) {
      this.$store.commit("UPDATE_ACTIVE_NOTE_CONTENT_ITEM", { id, data });
    },
    reloadImg: (url) => `${url}?t=${new Date().getTime()}`,
    addListitem(container, el) {
      const text = el.value.trim();
      if (text) {
        container.push(makeListItem(text));
        el.value = "";
      }
    },
    swapListItem(items, item, direction) {
      // direction is -1 (up) or 1 (down)
      const i = items.indexOf(item);
      const next = i + direction;
      if (next == -1 || next == items.length) return;
      [items[i], items[next]] = [items[next], items[i]];
    },
    prettyDate: (time) => parseAgoFromDateObj(time),
  },
  components: {
    GroupButton,
    GroupButtonItem,
    highlightjs: hljsVuePlugin.component,
  },
};
</script>