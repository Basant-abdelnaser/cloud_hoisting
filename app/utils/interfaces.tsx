export interface Article {
  id: number;
  title: string;
  description: string;
  comments?: Comment[];
  createdAt: Date;
}
