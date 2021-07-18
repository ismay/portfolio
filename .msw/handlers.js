import { graphql } from "msw";
import { about } from "./mocks/pages";
import { one, three, two } from "./mocks/works";

const works = [one, two, three];
const pages = [about];

const handlers = [
  graphql.query("getWorks", (req, res, ctx) =>
    res(
      ctx.data({
        works,
      })
    )
  ),

  graphql.query("getWorkSlugs", (req, res, ctx) =>
    res(
      ctx.data({
        works,
      })
    )
  ),

  graphql.query("getWork", (req, res, ctx) => {
    const { slug } = req.variables;
    const work = works.find((w) => w.slug === slug);

    return res(
      ctx.data({
        work,
      })
    );
  }),

  graphql.query("getPage", (req, res, ctx) => {
    const { title } = req.variables;
    const page = pages.find((p) => p.title === title);

    return res(
      ctx.data({
        page,
      })
    );
  }),
];

export default handlers;
