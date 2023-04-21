import { Author } from '../../users/domain/Author';

export interface Post {
	userId: number;
	id: number;
	title: string;
	body: string;
	author?: Author;
	commentCount?: number;
}
