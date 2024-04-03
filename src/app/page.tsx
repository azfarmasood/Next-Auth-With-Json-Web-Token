import Button from "@/components/Button";

export default function Home() {
  return (
    <main  className=" flex flex-col min-h-[90vh] justify-center items-center">
      <h1 className="md:text-5xl font-bold uppercase">Success fully Loged In</h1>
      <span className="md:text-3xl font-bold mt-3 uppercase">Great!</span>
      <h2 className="md:text-3xl font-bold mt-3 uppercase">Now logout nothing to see here!</h2>
      <Button />
    </main>
  );
}
