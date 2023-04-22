import { useState } from 'react';
import { UserRepository } from '@/src/modules/users/domain/UserRepository';
import { PostRepository } from '@/src/modules/posts/domain/PostRepository';
import { PostDataCreate } from '@/src/modules/posts/domain/PostDataCreate';
import { Post } from '@/src/modules/posts/domain/Post';
import { createPost } from '@/src/modules/posts/application/create/createPost';
import { FormStatus } from '@/src/hooks/useFormData';
export function usePostForm(
	userRepository: UserRepository,
	postRepository: PostRepository,
): {
	formStatus: FormStatus;
	submitForm: (formData: PostDataCreate) => void;
	resetFormStatus: () => void;
	postCreated: Post | null;
} {
	const [formStatus, setFormStatus] = useState(FormStatus.INITIAL);
	const [postCreated, setPostCreated] = useState<Post | null>(null);

	const submitForm = async ({ title, body, userId }: PostDataCreate) => {
		setFormStatus(FormStatus.LOADING);

		try {
			const postCreated = await createPost(
				postRepository,
				userRepository,
			)({ title, body, userId }).catch(() => {
				throw new Error('Error creating post');
			});
			setPostCreated(postCreated);
			setFormStatus(FormStatus.SUCCESS);
		} catch (error) {
			setFormStatus(FormStatus.ERROR);
		}
	};

	const resetFormStatus = () => setFormStatus(FormStatus.INITIAL);

	return {
		formStatus,
		submitForm,
		resetFormStatus,
		postCreated,
	};
}
