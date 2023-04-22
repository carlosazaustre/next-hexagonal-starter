/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { createApiPostRepository } from '@/src/modules/posts/infra/ApiPostRepository';
import { createApiUserRepository } from '@/src/modules/users/infra/ApiUserRepository';
import { CreatePostForm } from '@/src/sections/posts/CreatePostForm';
import { FormStatus, useFormData } from '@/src/hooks/useFormData';
import { usePostForm } from '@/src/sections/posts/usePostForm';
import { Post } from '@/src/modules/posts/domain/Post';
import { PostCard } from '@/src/sections/posts/PostCard';
// TODO: import validations from domain

const postRepository = createApiPostRepository();
const userRepository = createApiUserRepository();

const initialState = {
	title: '',
	body: '',
};

function SuccessNotification({ post, resetForm }: { post: Post | null, resetForm: () => void }) {
	return (
		<>
			{post
				? (<PostCard post={post} />)
				: ''
			}
			<div className="toast">
				<div className="alert alert-success">
					<p>🚀 Success post created!</p>
					<button className="btn btn-outline" onClick={resetForm}>Create new post</button>
				</div>
			</div>
		</>
	);
}

function ErrorNotification({ resetForm }: { resetForm: () => void }) {
	return (
		<div className="toast">
			<div className="alert alert-error">
				<p>🫤 Error!</p>
				<button className="btn btn-outline" onClick={resetForm}>Reset Form</button>
			</div>
		</div>
	);
}

function Loading() {
	return (
		<div className="text-2xl font-bold m-6">Loading...</div>
	);
}


export default function CreatePage() {
	const [errors, setErrors] = useState(initialState);
	const { formData, updateForm, resetForm } = useFormData(initialState);
	const { formStatus, submitForm, resetFormStatus, postCreated } = usePostForm(
		userRepository,
		postRepository,
	);

	//TODO: useEffect to validate form

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		submitForm({...formData, userId: 1});
	}

	if (formStatus === FormStatus.LOADING) {
		return <Loading />
	}

	if (formStatus === FormStatus.SUCCESS) {
		return <SuccessNotification 
			post={postCreated}
			resetForm={() => {
				resetForm();
				resetFormStatus();
			}}
		/>
	}

	if (formStatus === FormStatus.ERROR) {
		return <ErrorNotification resetForm={resetFormStatus} />
	}

	return (
		<>
			<CreatePostForm
				onSubmit={handleSubmit}
				onChange={updateForm}
			/>
		</>
	);
}
