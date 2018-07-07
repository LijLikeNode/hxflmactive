<template>
    <div class="c">
        <yd-datetime type="date" v-model="date" class="selects" ref="datetime" :startDate="startDate" :endDate="endDate"></yd-datetime>
        <input class="inlineInput" type="text" readonly v-model="age">
        <b @click="$refs.datetime.open();"></b>
    </div>
</template>
<script>
    export default {
        name: 'selects',
        data(){
            return {
                date:'1987-01-01',
                startDate:'',
                endDate:'',
                // age:'20岁',
            };
        },
        props:[],
        computed:{
            age(){
                let a;
                a = common.jsGetAge(this.date);
                return a+'岁';
            },
        },
        watch:{
            age:{
                handler(){
                    this.$emit('query');
                },
            }
        },
        mounted(){
            this.startDate = common.GetDateStr(-1,-55);
            this.endDate = common.GetDateStr(-28);
        },
        methods: {
            change(){
                this.$emit('changeD',this.date);
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url(../assets/css/main.less);
div.c{
    position:relative;
    .selects{
        display:inline-block;width:70%;background: #d8e48d;outline: none;border:1px solid #1b9832;height:1.8em;line-height:1.8;padding-left: .2em;
    }
    .inlineInput{
        display:inline-block;width: 25%;background: #d8e48d;outline: none;border:1px solid #1b9832;height:1.8em;line-height:1.8;text-align: center;vertical-align:0.05em;
    }
    b{
        background:url('../assets/img/new/n_calender.png') no-repeat center center ; background-size:100%;width:1.5em;height:1.5em;position:absolute;top:.2em;right: -1.5em;
    }
} 
</style>
