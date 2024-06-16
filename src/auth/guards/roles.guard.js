import { Injectable, Dependencies } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../roles/roles.decorator';

@Injectable()
@Dependencies(Reflector)
export class RolesGuard {
    #reflector;

    constructor(reflector) {
        this.#reflector = reflector;
    }

    canActivate(context) {
        const rolesNecessarias = this.#reflector.getAllAndOverride(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!rolesNecessarias) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        console.log(user);
        console.log(user.roles);
        console.log(rolesNecessarias);
        return rolesNecessarias.some(role => user.roles.includes(role));
    }
}
