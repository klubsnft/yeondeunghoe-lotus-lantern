import { DomNode, el, msg } from "skydapp-browser";
import ViewUtil from "../../../view/ViewUtil"

interface Menu {
    uri?: string;
    href?: string;
    key: string;
    children?: {
        uri?: string;
        href?: string;
        key: string;
    }[];
}

class MenuTreeBuilder {

    public build(menus: Menu[], parent?: Menu) {
        const lis: DomNode[] = parent === undefined ? [] : [el("li.parent",
            el(`a${location.pathname === `/${parent.uri}` ? ".on" : ""}`,
                msg(parent.key),
                {
                    href: parent.href === undefined ? undefined : parent.href,
                    target: parent.href === undefined ? undefined : "_blank",
                    click: parent.uri === undefined ? undefined : () => ViewUtil.go(`/${parent.uri}`),
                },
            ),
        )];
        for (const menuItem of menus) {
            const li = el("li",
                el(`a${location.pathname === `/${menuItem.uri}` ? ".on" : ""}`,
                    msg(menuItem.key),
                    {
                        href: menuItem.href === undefined ? undefined : menuItem.href,
                        target: menuItem.href === undefined ? undefined : "_blank",
                        click: menuItem.uri === undefined ? undefined : () => ViewUtil.go(`/${menuItem.uri}`),
                    },
                ),
            );
            if (menuItem.children !== undefined) {
                li.append(this.build(menuItem.children, menuItem));
            }
            lis.push(li);
        }
        return el("ul", ...lis);
    }
}

export default new MenuTreeBuilder();
