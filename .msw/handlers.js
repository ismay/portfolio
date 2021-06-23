import { graphql } from "msw";
import { one, three, two } from "./mocks/works";

const works = [one, two, three];

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
];

export default handlers;
