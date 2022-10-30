import httpService from "./http.service";

const todosEndpoint = "/todos"
const todosService = {
    fetch: async () => {
        const { data } = await httpService.get(todosEndpoint, {
            params: {
                _page: 1,
                _limit: 10
            }
        })
        return data
    },
    createTodo: async (newData) => {
        const { data } = await httpService.post(todosEndpoint, newData)
        return data
    }
}

export default todosService
