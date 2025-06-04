import { ShimmerButton } from "../magicui/shimmer-button"

type Props = {
  onNext: () => void
  text?: string
}

export default function BtnQuiz({ onNext, text = "Continuer ⮕"  }: Props) {
  return (
    <ShimmerButton
      onClick={onNext}
      background="#DB80FF"
      borderRadius="20px"
      shimmerColor="white"
      className="w-[355px] sm:w-[370px] md:text-md md:w-[400px] text-white tracking-widest uppercase"
    >
      <span className="font-bold text-xl">{text}</span>
    </ShimmerButton>
  )
}
