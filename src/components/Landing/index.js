import React from "react";

import { FirebaseContext } from "../Firebase";

const LandingPage = () => {
  return (
    <FirebaseContext.Consumer>
      {(firebase) => {
        return <LandingPageBase firebase={firebase} />;
      }}
    </FirebaseContext.Consumer>
  );
};
class LandingPageBase extends React.Component {
  // for testing purposes
  handleOnClick = (e) => {
    console.log("firebase");
    // this.props.firebase.texts().push({
    //   title: "אֲנִי רוֹצֶה כֶּלֶב",
    //   author: "משה שרת",
    //   level: "bw_lev_4",
    //   image:
    //     "https://res.cloudinary.com/plantscope/image/upload/v1628668074/bookworm_webapp/illustrations/anj_tfre_klb.jpg",
    //   educator_email: "ori.shmolovsky@gmail.com",
    //   reading:
    //     '{"educator":{"ori.shmolovsky@gmail.com":"https://res.cloudinary.com/plantscope/video/upload/v1630504665/Admin%20recordings/nuvwzhoam3zybjgpyihx.mp3"},"admin":{"orishoval":"https://res.cloudinary.com/plantscope/video/upload/v1639911616/Admin%20recordings/cutb1dvhprctla1tu6xs.mp3","shovaladmin":"https://res.cloudinary.com/shoval/video/upload/v1641806620/Admin%20recordings/f4wjffyqblzpbt06iey3.mp3"}}',
    //   content_type: "bw_content_type_religious",
    //   createdAt: this.props.firebase.serverValue.TIMESTAMP,
    //   updatedAt: this.props.firebase.serverValue.TIMESTAMP,
    // });
    // this.props.firebase
    //   .texts()
    //   .orderByChild("educator_email")
    //   .equalTo("lushishm@gmail.coml")
    //   .on("value", (snapshot) => {
    //     const texts = snapshot.val();
    //     console.log(texts);
    //   });

    // var textRef;

    // this.props.firebase
    //   .texts()
    //   .orderByChild("path")
    //   .equalTo("content/stories/אֲנִי-אוֹהֵב-לֶאֱכוֹל.md")
    //   .once("value", (snapshot) => {
    //     textRef = snapshot.val();

    //     if (textRef) {
    //       let key = Object.keys(textRef)[0];
    //       snapshot.ref.child(key).update({ updatedAt: "122" });
    //     } else {
    //       console.log("no such value");
    //     }
    //   });

    // const query = this.props.firebase
    //   .texts()
    //   .orderByChild("path")
    //   .equalTo("content/stories/אֲנִי-אוֹהֵב-לֶאֱכוֹל.md");

    // console.log(query.ref);
    //"-N3F1SFbLqpPaHZSltYS"

    // this.props.firebase.text("-N3F1SFbLqpPaHZSltYS").update({ level: "123" });

    // var ref = this.props.firebase.text("-N3F1SFbLqpPaHZSltYS");

    // query.ref.update({ level: "121" });

    // // update if exists
    // if (textRef.ref) {
    //   textRef.ref.update({ updatedAt: "121" });
    // }

    // ** query all texts ** //
    // this.props.firebase.texts().once("value", (snapshot) => {
    //   console.log(snapshot.val());
    // });

    // ** query by content type ** //
    // this.props.firebase
    //   .texts()
    //   .orderByChild("content_type")
    //   .equalTo("bw_content_type_religious")
    //   .on("value", (snapshot) => {
    //     const texts = snapshot.val();
    //     console.log(texts);
    //   });

    // ** query by level and content type ** //
    // this.props.firebase
    //   .texts()
    //   .orderByChild("level")
    //   .equalTo("bw_lev_1")
    //   .on("value", (snapshot) => {
    //     const texts = snapshot.val();
    //     let structured = Object.keys(texts).map((uid) => {
    //       let item = {};
    //       item[texts[uid].path] = texts[uid];
    //       return item;
    //     });
    //     let filtered = structured.filter(
    //       (item) =>
    //         Object.values(item)[0].content_type === "bw_content_type_religious"
    //     );
    //     console.log(filtered);
    //   });

    // ** query general texts ** //
    //lushishm@gmail.com
    // this.props.firebase
    //   .texts()
    //   .orderByChild("educator_email")
    //   .equalTo("lushishm@gmail.com")
    //   .once("value", (snapshot) => {
    //     const texts = snapshot.val();
    //     console.log(Object.keys(texts).length);
    //   });

    this.props.firebase
      .texts()
      .orderByChild("educator_email")
      .equalTo("lushishm@gmail.com")
      .once("value", (snapshot) => {
        const texts = snapshot.val();
        console.log(Object.keys(texts).length);
      });

    // ** query by title ** //
    // this.props.firebase
    //   .texts()
    //   .orderByChild("title")
    //   .equalTo("אָסָף שָׁר וְרָקַד")
    //   .once("value", (snapshot) => {
    //     const texts = snapshot.val();
    //     console.log(Object.keys(texts).length);
    //   });

    // Count children including child is null
    // this.props.firebase
    //   .texts()
    //   .orderByChild("educator_email")
    //   .once("value", (snapshot) => {
    //     const texts = snapshot.val();
    //     console.log(Object.keys(texts).length);
    //   });
  };

  render() {
    return <button onClick={(e) => this.handleOnClick(e)}>test</button>;
  }
}

export default LandingPage;
