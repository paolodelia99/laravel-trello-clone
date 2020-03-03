import axios from 'axios';

const state = {
    categories: [],
    tasks: []
};

const getters = {
    allTasks: state => state.tasks,
    allCategories: state => state.categories
};

const actions = {
    async fetchTasks({commit}){
        const res = await axios.get('api/task');

        commit('setTasks',res.data);
    },
    async fetchCategories({commit}){
        const res = await axios.get('api/category');

        commit('setCategories',res.data);
    },
    async addTask({commit},task){
        const res = await axios.post('api/task',task);

        commit('addTask',res.data);
    },
    async deleteTask({commit},id){
        await axios.delete('api/task',id);

        commit('deleteTask',id)
    },
    async updateTask({commit},task){
        const res = await axios.put('api/task');

        commit('changeTask',task)
    }
};

const mutations = {
    setTasks: (state,tasks) => (state.tasks = tasks),
    setCategories: (state,categories) => (state.categories = categories),
    addTask: (state,task) => state.tasks.unshift(task),
    deleteTask: (state,id) => (state.tasks = state.tasks.filter(task => task.id !== id)),
};

export default {
    state,
    getters,
    actions,
    mutations
}
