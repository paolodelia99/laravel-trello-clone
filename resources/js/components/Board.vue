<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="categories-container">
                <!--Category container-->
                <div class="tasks-container" v-for="(category,catIndex) in categories" :key="category.id">
                    <div class="card">
                        <div class="card-header custom-card-header">
                            <h4 class="card-title custom-title">{{category.name}}</h4>
                        </div>
                        <div class="card-body card-body-dark">
                            <draggable
                                :options="dragOptions"
                                :list="category.tasks"
                                element="div"
                                @end="changeOrder"
                                draggable=".item"
                                :id="category.id"
                            >
                                <!--Task container-->
                                <div v-for="(task,taskIndex) in category.tasks" :key="task.category_id+','+task.order+','+task.id" class="transit-1 item" :id="task.id">
                                    <div class="small-card">
                                        <div style="width: 85%">
                                            <textarea v-if="task === editingTask" class="text-input task-text" @keyup.enter="endEditing(task)" @blur="endEditing(task)" v-model="task.name"></textarea>
                                            <label for="checkbox" v-if="task !== editingTask" @dblclick="editTask(task)" class="task-text">{{ task.name }}</label>
                                        </div>
                                        <div class="cancel-wrapper" >
                                            <button @click="deleteTask($event,task.id)" class="delete-btn">
                                                <v-icon name="x-circle"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <!--Add new task container-->
                                <div
                                        slot="footer"
                                        role="group"
                                        class="small-card"
                                >
                                    <h5 class="text-center task-text" @click="addNew(catIndex)">Add new card</h5>
                                </div>
                            </draggable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import draggable from 'vuedraggable';

    export default {
        name: "Board",
        components: {
            draggable
        },
        data(){
            return {
                categories : [],
                editingTask : null
            }
        },
        methods : {
            //Add new Task
            addNew(id) {
                if(localStorage.getItem('user_id')){
                    let user_id = localStorage.getItem('user_id');
                    let name = "New task";
                    let category_id = this.categories[id].id;
                    let order = this.categories[id].tasks.length;

                    axios.post('api/task', {user_id, name, order, category_id}).then(response => {
                        this.categories[id].tasks.push(response.data.data)
                    })
                }
            },
            //Fetch tasks for every category
            loadTasks() {
                this.categories.map(category => {
                    axios.get(`api/category/${category.id}/tasks`).then(response => {
                        category.tasks = response.data
                    })
                })
            },
            //Change the Task order
            changeOrder(data){
                let toTask = data.to;
                let fromTask = data.from;
                let task_id = data.item.id;
                let category_id = fromTask.id == toTask.id ? null : toTask.id;
                let order = data.newIndex == data.oldIndex ? false : data.newIndex;

                if (order !== false) {
                    axios.patch(`api/task/${task_id}`, {order, category_id});
                }
            },
            //Patch reqest when the editing is finished
            endEditing(task) {
                this.editingTask = null;

                axios.patch(`api/task/${task.id}`, {name: task.name});
            },
            //Set current edit task
            editTask(task){
                this.editingTask = task
            },
            //Hide a task and remove it
            deleteTask(e,id){
                axios.delete(`api/task/${id}`)
                    .then(()=>{
                        const smallCardNode = e.target.parentNode.parentNode.parentNode;

                        smallCardNode.style.display = "none";
                    });
            }
        },
        mounted(){
            let token = localStorage.getItem('jwt')

            axios.defaults.headers.common['Content-Type'] = 'application/json';
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            //Fetch all the categories and the respective tasks
            axios.get('api/category').then(response => {
                response.data.forEach((data) => {
                    this.categories.push({
                        id : data.id,
                        name : data.name,
                        tasks : []
                    })
                });
                this.loadTasks()
            })
        },
        computed: {
            dragOptions () {
                return  {
                    animation: 1,
                    group: 'description',
                    ghostClass: 'ghost'
                };
            },
        },
        beforeRouteEnter (to, from, next) {
            if ( ! localStorage.getItem('jwt')) {
                return next('login')
            }

            next()
        }
    }
</script>

<style scoped>
    .custom-card-header{
        background: #00c2e0;
        color: white!important;
    }

    .custom-title{
        color: white!important;
        font-size: 24px;
    }

    .categories-container{
        width: 100%;
        display:flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-around;
    }

    .tasks-container{
        flex-basis: 30%;
    }

    .card {
        border:0;
        border-radius: 0.5rem;
    }

    .transit-1 {
        transition: all 1s;
    }

    .small-card {
        padding: 1rem;
        background: #f5f8fa;
        margin-bottom: 5px;
        border-radius: .25rem;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }

    .cancel-wrapper{
        margin: 2px;
    }

    .delete-btn{
        background: transparent;
        border: none;
    }

    .icon,.v-icon{
        width: 18px;
    }

    .task-text{
        word-wrap: break-word;
        font-size: 18px;
    }

    .card-body-dark{
        background-color: #ccc;
    }

    textarea {
        overflow: visible;
        outline: 1px dashed black;
        border: 0;
        padding: 6px 0 2px 8px;
        width: 100%;
        height: 100%;
        resize: none;
    }

</style>
