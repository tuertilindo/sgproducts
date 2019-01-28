import React from "react";
import { Carousel, Card, Icon, Avatar } from "antd";
import "./thumnails.css";
const { Meta } = Card;

export default class Images extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: props.cards || []
    };
  }
  editCard() {}
  render() {
    const { onChange, editable, defaultValue } = this.props;
    const { cards } = this.state;
    return (
      <div>
        <Carousel
          afterChange={onChange}
          draggable
          dots={false}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 6,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 680,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 2
              }
            },

            {
              breakpoint: 580,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 320,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]}
        >
          {cards.map(card => (
            <div key={card.id}>
              <Card cover={<img alt="imagen" src={card.path} />}>
                <Meta title={card.title} description={card.description} />
                <Icon type="close" />
              </Card>
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
}
