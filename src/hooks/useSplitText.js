//인수로 참조객체를 받아서 해당 참조객체 안쪽의 글자를 분리해주는 함수를 반환하는 hook
export function useSplitText(ref, gap = 0.1, delay = 0) {
	return (ref, gap = 0.1, delay = 0) => {
		let count = 0;
		let tags = '';
		for (let letter of ref.current.innerText) {
			tags += `<span style='transition-delay:${gap * count + delay}s'>${letter}</span>`;
			count++;
		}
		ref.current.innerText = '';
		ref.current.innerHTML = tags;
	};
}

//커스텀훅은 일반 컴포넌트 함수와는 달리 JSX를 반환하는 것이 아닌 자주쓰는 함수나 리턴값을 반환
//커스텀훅은 use라는 접두사로 시작해야됨
