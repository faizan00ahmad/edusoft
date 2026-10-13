import PageHero from "./PageHero";
import LoginForm from "./LoginForm";

/** Mirrors the live login pages. The form posts straight to edusoftsolutions.com, which handles authentication. */
export default function LoginPage({ title, action }: { title: string; action: string }) {
  return (
    <>
      <PageHero title={title} crumbs={[{ label: "Home", href: "/" }, { label: title }]} />
      <section className="mx-auto max-w-lg px-6 py-20">
        <LoginForm action={action} />
      </section>
    </>
  );
}
