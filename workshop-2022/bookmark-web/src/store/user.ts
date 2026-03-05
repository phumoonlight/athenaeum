import { User } from 'firebase/auth'
import { ref } from 'vue'

const user = ref<User | null>(null)

export const useUserStore = () => {
	return {
		user,
	}
}
