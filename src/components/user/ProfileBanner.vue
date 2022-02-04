<template>
    <div class=" w-full flex flex-row gap-2">
        <img :src="profileImg" class=" w-10 h-10 rounded-full aspect-square" alt="">
        <div class="flex flex-col gap-0 flex-grow">
            <h1 class=" font-medium flex-grow">Rubbie Kelvin</h1>
            <p class=" text-gray-500 text-sm ">dev.rubbie@gmail.com</p>
        </div>
        <svg class=" min-w-max min-h-max" height="22" width="22" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 11.7848L13.5075 7.27725L12.4478 6.216L9 9.666L5.553 6.216L4.4925 7.2765L9 11.7848Z" fill="#797979"/>
        </svg>
    </div>
</template>

<script>
import profileImg from '../../assets/images/profile.png'
export default {
    data(){
        return {profileImg}
    }
}
</script>