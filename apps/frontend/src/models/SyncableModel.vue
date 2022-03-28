<template>
  <slot :error="error" :result="result" :fetching="fetching" />
</template>

<script>
import { URL as URL_ } from "../constants/api";
import { set } from "idb-keyval";

export const METHODS = {
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
};

export default {
  props: {
    name: {
      // function name
      type: String,
      required: true,
    },
    subject: {
      // the key for this request. used to store in db
      type: String,
      default: null,
    },
    headers: {
      type: Object,
      default: () => ({}),
    },
    method: {
      type: String,
      default: METHODS.GET,
    },
    params: {
      type: Array,
      default: () => [],
    },
    body: {
      type: Object,
      default: null,
    },
    recurring: {
      type: Boolean,
      default: false,
    },
    recurrInterval: {
      type: Number,
      default: 30, // in sec
    },
    fetchOnMount: {
      // do a call once the component is mounted
      type: Boolean,
      default: false,
    },
    saveToDB: {
      // save response to db?
      type: Boolean,
      default: false,
    },
    useDB: {
      // use saved db response if fetch is unsucessfull
      type: Boolean,
      default: false,
    },
  },
  computed: {
    url() {
      const url_ = new URL(`${URL_}/functions/${this.name}/`);
      const params = this.params || [];

      params.forEach((item) => {
        url_.searchParams.append(item.key, item.value);
      });

      return url_.toString();
    },
  },
  data: () => ({
    error: null,
    result: null,
    fetching: false,
    _intervalId: null,
  }),
  async mounted() {
    if (this.fetchOnMount) {
      await this.doFetch();
      this._intervalId = window.setInterval(
        (() => {
          if (this.recurring) {
            this.doFetch();
          }
        }).bind(this),
        this.recurrInterval * 1000
      );
    }
  },
  beforeUnmount() {
    if (this._intervalId) window.clearInterval(this._intervalId);
  },
  methods: {
    async doFetch() {
      this.fetching = true;
      try {
        const res = await fetch(this.url, {
          method: this.method,
        });
        this.result = await res.json();

        if (this.saveToDB && this.subject !== null) {
          await set(this.subject, JSON.stringify(this.result));
        }

        this.error = false;
        this.fetching = false;
      } catch (e) {
        this.error = e;
        this.fetching = false;
      }
    },
  },
};
</script>