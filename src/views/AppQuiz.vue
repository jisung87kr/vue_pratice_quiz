<template>
    <h2 class="mb-3 text-xl text-bold">스피드 퀴즈</h2>
    <div class="my-5 flex gap-3">
        <AppBtn @click="reset">리셋</AppBtn>
        <AppBtn @click="startQuiz" :active="start">시작</AppBtn>
        <AppBtn @click="stopQuiz" :active="!start">중지</AppBtn>
        <AppBtn @click="prev">이전</AppBtn>
        <AppBtn @click="next">다음</AppBtn>
    </div>
    <div class="my-5 flex gap-3">
        <AppBtn @click="correct(true)">정답</AppBtn>
        <AppBtn @click="correct(false)">패스</AppBtn>
    </div>
    <!-- <div class="mb-3">
        <AppBtn @click="requestPermission">시작</AppBtn>
        <AppBtn @click="stopEvent">중지</AppBtn>
        <ul class="mt-3 text-sm">
            <li>isPossible : {{ orientalEvent.isPossible }}</li>
            <li>isRunning : {{ orientalEvent.isRunning }}</li>
            <li>result : {{ orientalEvent.result }}</li>
            <li>absolute : {{ orientalEvent.absolute }}</li>
            <li>alpha : {{ orientalEvent.alpha }}</li>
            <li>beta : {{ orientalEvent.beta }}</li>
            <li>gamma : {{ orientalEvent.gamma }}</li>
        </ul>
    </div> -->
    <div>
        <div class="mb-5 border-t border-b border-slate-600 py-3">
            <div>남은 시간 : {{ remainTime }}</div>
            <div class="mt-2 text-xl">현재 퀴즈 : {{ currentItem.title }}</div>
        </div>
        <ul class="list-disc pl-4">
            <li 
            v-for="item in list" 
            :key="item.id"
            class=""
            :class="{'text-indigo-400' : item.title == currentItem.title}"
            >
                <div class="flex gap-3">
                    <div>{{ this.getTitle(item) }}</div>
                    <div>
                        {{ item.correct == null ? '' : item.correct ? '정답' : '오답' }}
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import AppBtn from '../components/AppBtn.vue';
export default {
    components:{
        AppBtn
    },
    data(){
        return{
            start: false,
            limitTime: 10,
            remainTime: 0,
            currentItem: {},
            list: [
                {id: 1, title: '퀴즈1', correct: null},
                {id: 2, title: '퀴즈2', correct: null},
                {id: 3, title: '퀴즈3', correct: null},
                {id: 4, title: '퀴즈4', correct: null},
            ],
            orientalEvent: {
                isPossible: true,
                isRunning: false,
                result: '',
                absolute: '',
                alpha: '',
                beta: '',
                gamma: ''
            }
        }
    },
    computed: {
        getFirstItem(){
            return this.list[0]
        },
        getListSize(){
            return this.list.length;
        },
        getLastItem(){
            return this.list[this.getListSize];
        },
        getCurrentIndex(){
            return this.list.findIndex(a => a.id == this.currentItem.id);
        },
    },
    mounted: function(){
        this.currentItem = this.getFirstItem;
        if (typeof DeviceOrientationEvent !== 'function') {
            this.orientalEvent.isPossible = false;
            this.orientalEvent.result = 'DeviceOrientationEvent not detected';
        }

        if (typeof DeviceOrientationEvent.requestPermission !== 'function') {
            this.orientalEvent.isPossible = false;
            this.orientalEvent.result = 'DeviceOrientationEvent.requestPermission not detected';
        }
    },
    methods: {
        reset(){
            this.list.map(a => {
                a.correct = null;
                return a;
            });

            this.start = false;
            this.currentItem = this.getFirstItem;
            this.remainTime = this.limitTime;
        },
        startQuiz(){
            this.start = true;
            if(this.remainTime == 0){
                this.remainTime = this.limitTime;
            }
            
            this.runningQuiz();
            this.requestPermission();
        },
        stopQuiz(){
            this.start = false;
        },
        runningQuiz(){
            if(!this.start){
                return false;
            }

            if(this.remainTime == 0){
                this.remainTime = this.limitTime;
                this.correct(false);
            }

            this.remainTime = this.remainTime - 1;
            setTimeout(this.runningQuiz, 1000);
        },
        prev(){
            let prevIndex = this.getCurrentIndex - 1;
            if(prevIndex < 0){
                this.start = false;
                prevIndex = 0;
                return alert('맨처음 입니다.');
            }

            this.currentItem = this.list[prevIndex];
        },
        next(){
            let nextIndex = this.getCurrentIndex + 1;
            let size = this.getListSize - 1;
            if(nextIndex > size){
                this.start = false;
                nextIndex = size;
                return alert('맨끝 입니다.');
            }
            this.currentItem = this.list[nextIndex];
        },
        correct(correct){
            let index = this.getCurrentIndex;
            this.currentItem.correct = correct;
            this.remainTime = this.limitTime;
            console.log(this.limitTime);
            if(index == this.getListSize -1){
                // return false;
            }
            this.next();
        },
        getTitle(item){
            if(item.id == this.currentItem.id || item.correct != null){
                return item.title;
            }
            return '비공개';
        },
        stopEvent(){
            removeEventListener('deviceorientation', this.runningEvent);
            this.orientalEvent.isRunning = false;
        },
        requestPermission(){
            if(this.orientalEvent.isPossible){
                DeviceOrientationEvent.requestPermission().then( result => {
                    return result;
                }).then( permissionState => {
                    this.orientalEvent.result = permissionState;
                    window.addEventListener('deviceorientation', this.runningEvent);
                });
            }
        },
        runningEvent(event){
            this.orientalEvent.isRunning = true;
            this.orientalEvent.absolute = event.absolute;
            this.orientalEvent.alpha    = event.alpha;
            this.orientalEvent.beta     = event.beta;
            this.orientalEvent.gamma    = event.gamma;

            if(this.orientalEvent.beta > 150){
                // alert('정답');
                this.stopEvent();
                setTimeout(() => {
                    this.correct(true);
                    this.requestPermission();
                }, 1000);
            }

            if(this.orientalEvent.beta < 30){
                // alert('패스');
                this.stopEvent();
                setTimeout(() => {
                    this.correct(false);
                    this.requestPermission();
                }, 1000);
            }
        }
    }
}
</script>