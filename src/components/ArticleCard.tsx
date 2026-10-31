import { OvalControl } from "./OvalControl";

type Article = {
  title: string;
  description: string;
  href: string;
  image: string;
  tone?: string;
};

type ArticleCardProps = {
  article: Article;
  variant: "home" | "archive";
  loading?: "eager" | "lazy";
};

export function ArticleCard({
  article,
  variant,
  loading = "lazy",
}: ArticleCardProps) {
  const isHome = variant === "home";
  const Heading = isHome ? "h3" : "h2";
  const copy = (
    <>
      <Heading>{article.title}</Heading>
      <p>{article.description}</p>
    </>
  );
  return (
    <article
      className={
        isHome
          ? `home-archive-card sticky p-[clamp(25px,3vw,58px)_clamp(20px,1.7vw,32px)_clamp(20px,2vw,38px)] text-left [box-shadow:-4px_14px_27px_#39393935] [border-top:1px_solid_#ffffff80] origin-[center_top] ${article.tone ?? ""}`
          : undefined
      }
    >
      <div
        className={
          isHome
            ? "archive-card-heading grid grid-cols-[1.3fr_1fr_0.7fr] gap-[4%] [align-items:start] mb-[clamp(28px,3vw,58px)]"
            : "archive-paper-heading flex justify-between items-start gap-[2em] min-h-[11.25em]"
        }
      >
        {isHome ? (
          copy
        ) : (
          <div className="archive-paper-copy flex items-start gap-[5em]">
            {copy}
          </div>
        )}
        <OvalControl
          as="a"
          appearance={isHome ? "home" : "archive"}
          className={isHome ? "home-oval" : "archive-read-more"}
          href={article.href}
          target={isHome ? "_blank" : undefined}
          rel={isHome ? "noreferrer" : undefined}
          aria-label={`Read more: ${article.title}`}
        >
          {isHome ? "Read more" : <span>Read more</span>}
        </OvalControl>
      </div>
      <div
        className={
          isHome
            ? "archive-image-frame h-[clamp(380px,34vw,650px)] overflow-hidden"
            : "archive-cover flex justify-center w-full overflow-clip items-center h-[41em] max-h-[41em]"
        }
      >
        <img
          src={article.image}
          alt={isHome ? article.title : `${article.title} editorial cover`}
          loading={loading}
        />
      </div>
    </article>
  );
}
