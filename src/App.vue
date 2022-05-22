<template>
    <div class="bg-slate-800 text-white">
        <div class="flex h-screen">
            <div class="w-40 border-r border-slate-600 p-4">
                <router-link to="/" class="block mb-2">home</router-link>
                <router-link to="/about" class="block mb-2">about</router-link>
                <router-link to="/quiz" class="block mb-2">quiz</router-link>
            </div>
            <div class="w-full  p-4">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>