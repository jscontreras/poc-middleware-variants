import { Blog } from "../../../components/Blog";

export default async function Page() {
  return <Blog>Case 1: SSR</Blog>
}

export const dynamic = 'force-dynamic';