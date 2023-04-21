interface CreatePostFormProps {
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CreatePostForm({ onSubmit, onChange }: CreatePostFormProps): JSX.Element {
	return (
		<>
			<h2 className="text-2xl font-bold mt-6 mx-6">Create a Post</h2>
			<form onSubmit={onSubmit}>
				<div className="form-control w-full max-w-xs m-6">
					<label className="label">
						<span className="label-text font-bold text-lg">Post Title</span>
					</label>
					<input
						type="text"
						placeholder="Type here"
						className="input input-bordered w-full max-w-xs"
						onChange={onChange}
					/>
					<label className="label">
						<span className="label-text-alt">Bottom Left label</span>
					</label>
				</div>
				<div className="form-control w-full max-w-xs m-6">
					<label className="label">
						<span className="label-text text-lg font-bold">Post Title</span>
					</label>
					<textarea
						className="textarea textarea-bordered"
						placeholder="Bio"
						onChange={onChange}
					></textarea>
					<label className="label">
						<span className="label-text-alt">Bottom Left label</span>
					</label>
				</div>
				<div className="form-control w-full max-w-xs m-6">
					<button className="btn btn-primary "type="submit">Create</button>
				</div>
			</form>
		</>
	)
}
