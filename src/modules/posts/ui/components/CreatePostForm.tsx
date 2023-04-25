interface CreatePostFormProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onChange: (value: any) => void;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function CreatePostForm({ onChange, onSubmit }: CreatePostFormProps): JSX.Element {
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
						name="title"
						placeholder="Type here"
						className="input input-bordered w-full max-w-xs"
						onChange={(ev) => onChange({ title: ev.target.value })}
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
						name="body"
						placeholder="Post text here"
						onChange={(ev) => onChange({ body: ev.target.value })}
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
