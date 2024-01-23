import { applyDecorators, UseGuards } from "@nestjs/common";
import { Role } from "../enums/role.enum";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard";
import { Roles } from "../decorators/roles.decorators";

export function Auth(role: Role) {
  return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard));
}