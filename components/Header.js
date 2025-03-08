export default function Header() {
  return (
    <div className={"p-4 border-b fixed w-full z-50 bg-black/80"}>
      <div className={"max-w-5xl mx-auto text-left"}>
        <h1
          className={
            "inline-block text-transparent bg-clip-text text-5xl font-bold bg-gradient-to-r from-[#999999] to-[#FFFFFF]"
          }
        >
          AI Fitness Trainer
        </h1>
      </div>
    </div>
  );
}
