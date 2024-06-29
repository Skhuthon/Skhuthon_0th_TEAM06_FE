export type Upload = {
  id: number;
  like: number;
  post_id: number;
  title: string;
};

export default Upload

export type Photo = {
  photo_title: string;
  photo_id: number;
  name: string;
  phto_path: string;
  like_count: number;
}
