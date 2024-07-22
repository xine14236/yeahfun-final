import { MdStars } from 'react-icons/md'

export default function FavorActive() {
  return (
    <>
      <div className="favor-active" role="button" tabIndex={0}>
        <MdStars size={30} />
      </div>
      <style jsx>{`
        .favor-active {
          background-color: #feaf18;
          color: #fefcf0;
          border-radius: 50%;
        }
      `}</style>
    </>
  )
}
