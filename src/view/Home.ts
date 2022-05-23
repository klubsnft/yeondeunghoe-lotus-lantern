import { DomNode, el, msg } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";
import artistJson from "./artists.json";
import Layout from "./Layout";

export default class Home implements View {

    private container: DomNode;
    private artistList: DomNode;

    constructor() {
        Layout.current.title = msg("HOME_TITLE");
        Layout.current.content.append(this.container = el(".home-view",
            el("section",
                el(".exhibition-container",
                    el("img", { src: "/images/view/poster.png", alt: "nft exhibition poster" }),
                    el(".mobile-container",
                        el("h2", msg("HOME_TITLE1")),
                        el("img", { src: "/images/view/poster.png", alt: "nft exhibition poster" }),
                    ),
                    el(".content",
                        el("h2", msg("HOME_TITLE2")),
                        el("h3", msg("HOME_DESC1")),
                        el("h4", msg("HOME_DESC2")),
                        el("p", msg("HOME_DESC3")),
                    ),
                ),
                el(".artists-container",
                    el("h2", msg("ARTISTS_TITLE")),
                    this.artistList = el(".artists-list"),
                ),
                // el(".display-container",
                //     el("h2", "Display 1"),
                //     el(".row",
                //         el(".column",
                //             el("img", { src: "/images/view/gallery-mock.png", alt: "gallery-mock" }),
                //             el("img", { src: "/images/view/gallery-mock.png", alt: "gallery-mock" }),
                //             el("img", { src: "/images/view/gallery-mock.png", alt: "gallery-mock" }),
                //             el("img", { src: "/images/view/gallery-mock.png", alt: "gallery-mock" }),
                //         ),
                //         el(".column",
                //             el("img", { src: "/images/view/gallery-mock.png", alt: "gallery-mock" }),
                //             el("img", { src: "/images/view/gallery-mock.png", alt: "gallery-mock" }),
                //             el("img", { src: "/images/view/gallery-mock.png", alt: "gallery-mock" }),
                //             el("img", { src: "/images/view/gallery-mock.png", alt: "gallery-mock" }),
                //         ),
                //     ),
                // ),
                // el(".irl-container",
                //     el("h2", "IRL"),
                //     el(".row",
                //         el(".column",
                //             el("img", { src: "/images/view/gallery-mock.png", alt: "gallery-mock" }),
                //             el("img", { src: "/images/view/gallery-mock.png", alt: "gallery-mock" }),
                //             el("img", { src: "/images/view/gallery-mock.png", alt: "gallery-mock" }),
                //             el("img", { src: "/images/view/gallery-mock.png", alt: "gallery-mock" }),
                //         ),
                //         el(".column",
                //             el("img", { src: "/images/view/gallery-mock.png", alt: "gallery-mock" }),
                //             el("img", { src: "/images/view/gallery-mock.png", alt: "gallery-mock" }),
                //             el("img", { src: "/images/view/gallery-mock.png", alt: "gallery-mock" }),
                //             el("img", { src: "/images/view/gallery-mock.png", alt: "gallery-mock" }),
                //         ),
                //     ),
                // ),
            ),
        ));
        this.init();
    }

    private init(): void {

        artistJson.map((data, index) => {
            let videoDisplay: DomNode<HTMLVideoElement>

            this.artistList.append(
                el("a", { href: data.url },
                    el(".image-container",
                        videoDisplay = el("video.art", { loop: "true", preload: "none" },
                            el("source", { src: "/images/view/video-mock.mp4", type: "video/mp4" })
                        ),
                        el("p", msg(data.name)),
                    ),
                ),
            );

            videoDisplay.style({
                "background-image": `url("${data.image}")`,
            });

            videoDisplay.onDom("mouseover", () => {
                videoDisplay.domElement.play();
            });
        });
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}