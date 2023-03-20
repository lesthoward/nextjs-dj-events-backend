/**
 * event controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::event.event",
  ({ strapi }) => ({
    async me(ctx) {
      const user = ctx.state.user;

      if (!user) {
        return ctx.badRequest(null, [
          { messages: "No authorization header was found" },
        ]);
      }

      const data = await strapi.entityService.findMany('api::event.event',{
        filters: {  
          user: {
            id: user.id
          }
        },
        populate: ['user', 'image']
      })

      const res = await this.sanitizeOutput(data, ctx);
      return data;
    },
  })
);
