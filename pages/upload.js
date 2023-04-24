import { useRouter } from 'next/router'

function Upload() {
  const router = useRouter()

  return <p>upload {router.query.id}</p>
}

export default Upload;
