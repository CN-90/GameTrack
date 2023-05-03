import { useUserStore } from '../../stores';

export function getUser() {
    const user = useUserStore((state) => state.user)
    return user;
}


export function setUser(user:any){
    const setUser = useUserStore.getState().setUser(user)
    return setUser;
}
