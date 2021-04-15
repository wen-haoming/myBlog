/**
 * desc : 点击 其中某一个 点击 按钮。在3秒内 切换 选中的账号。 查看 弹出的文本。
 */

import React from 'react';

class ProfilePageClass extends React.Component {
    render() {
        const { user } = this.props;

        const showMessage = () => {
            alert('我是 ' + user);
        };

        const handleClick = () => {
            setTimeout(showMessage, 3000);
        };

        return <button onClick={handleClick}>点击</button>;
    }
}

function ProfilePageFunction(props) {
    function showMessage() {
        alert('我是 ' + props.user); //
    }

    const handleClick = () => {
        setTimeout(showMessage, 3000);
    };

    return <button onClick={handleClick}>点击</button>;
}

export default class App extends React.Component {
    state = {
        user: '小明',
    };
    render() {
        return (
            <>
                <label>
                    <select
                        value={this.state.user}
                        onChange={e => this.setState({ user: e.target.value })}
                    >
                        <option value="小明">小明</option>
                        <option value="小红">小红</option>
                        <option value="小花">小花</option>
                    </select>
                </label>
                <h1>大家好，我是 {this.state.user} 请多多指教</h1>
                <p>
                    <ProfilePageFunction user={this.state.user} />
                    <b> (函数)</b>
                </p>
                <p>
                    <ProfilePageClass user={this.state.user} />
                    <b> (类)</b>
                </p>
            </>
        );
    }
}
