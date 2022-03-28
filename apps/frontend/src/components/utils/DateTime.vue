<template>
  <slot :fuzzy="fuzzy" />
</template>

<script>
export default {
  props: {
    datetime: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    fuzzy: "now",
    intervalId: null,
  }),
  mounted() {
    const parse = () => {
      this.fuzzy = this.parseAgoFromDateObj(new Date(this.datetime));
    };

    this.intervalId = window.setInterval(parse.bind(this), 30000);
    parse();
  },
  beforeUnmount() {
    if (this.intervalId !== null) window.clearInterval(this.intervalId);
  },
  methods: {
    parseAgoFromDateObj(datetime) {
      const now = new Date();
      const delta = now - datetime;
      const years = now.getFullYear() - datetime.getFullYear();
      const months = now.getMonth() - datetime.getMonth();
      const sec = delta / 1000;
      const minutes = sec / 60;
      const hours = minutes / 60;
      const days = hours / 24;

      if (years > 0) {
        if (years == 1) return "last year";
        return `${years} years ago`;
      }

      if (months > 0) {
        if (months == 1) return "last month";
        return `${months} months ago`;
      }

      if (days > 1) {
        if (days < 2) return "yesterday";
        return `${Math.floor(days)} days ago`;
      }

      if (hours > 1) {
        if (hours < 2) return "an hour ago";
        return `${Math.floor(hours)} hours ago`;
      }

      if (minutes >= 1) return `${Math.floor(minutes)} minutes ago`;
      return "few seconds ago";
    },
  },
};
</script>