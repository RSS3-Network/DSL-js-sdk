import type {
	Action,
	CollectibleApproval,
	CollectibleBurn,
	CollectibleMint,
	CollectibleTrade,
	CollectibleTransfer,
	ExchangeLiquidity,
	ExchangeStaking,
	ExchangeSwap,
	MetaverseBurn,
	MetaverseMint,
	MetaverseTrade,
	MetaverseTransfer,
	SocialComment,
	SocialDelete,
	SocialMint,
	SocialPost,
	SocialProfile,
	SocialProxy,
	SocialRevise,
	SocialReward,
	SocialShare,
	StakeStaking,
	StakeTransaction,
	StakerProfitSnapshot,
	TransactionApproval,
	TransactionBridge,
	TransactionBurn,
	TransactionEvent,
	TransactionMint,
	TransactionTransfer,
} from "@rss3/api-core";

export function renderItemActionToHTML(actions: Action[]): string | undefined {
	let joint = "";

	let i = 0;
	for (const action of actions) {
		const metadata = action.metadata;
		if (!metadata) {
			continue;
		}
		const { tag } = action;
		switch (tag) {
			case "social":
				joint += renderSocialTagContent(action);
				break;
			case "collectible":
				joint += renderCollectibleTagContent(action);
				break;
			case "metaverse":
				joint += renderMetaverseTagContent(action);
				break;
			case "exchange":
				joint += renderExchange(action);
				break;
			case "transaction":
				joint += renderTransaction(action);
				break;
		}

		if (i < actions.length - 1) joint += "<br />";
		i++;
	}

	return joint;
}

const renderTransaction = (action: Action) => {
	let joint = "";
	const { type } = action;
	const tag = "transaction";
	switch (type) {
		case "transfer":
		case "burn":
		case "mint":
		case "approval": {
			const metadata = extractMetadata(tag, type, action);
			if (!metadata) {
				break;
			}
			joint += buildHTML([
				/* html */ `<h4>Transaction ${
					type.toUpperCase().at(0) + type.slice(1)
				}</h4>`,
				/* html */ `<p><strong>Name:</strong> ${metadata.name}</p>`,
				/* html */ `<p><strong>Value:</strong> ${metadata.value}</p>`,
				/* html */ `<p><strong>Standard:</strong> ${metadata.standard}</p>`,
				/* html */ `<p><strong>Symbol:</strong> ${metadata.symbol}</p>`,
				/* html */ `<p><strong>Decimals:</strong> ${metadata.decimals}</p>`,
				/* html */ `<p><strong>Address:</strong> ${metadata.address}</p>`,
			]);
			break;
		}
		case "event": {
			const metadata = extractMetadata(tag, type, action);
			if (!metadata) {
				break;
			}
			joint += buildHTML([
				/* html */ "<h4>Transaction Event</h4>",
				/* html */ `<p><strong>Block Hash:</strong> ${metadata.block.hash}</p>`,
				/* html */ `<p><strong>Transaction Hash:</strong> ${metadata.transaction.hash}</p>`,
			]);
			break;
		}
		case "bridge": {
			const metadata = extractMetadata(tag, type, action);
			if (!metadata) {
				break;
			}
			joint += buildHTML([
				/* html */ "<h4>Transaction Bridge</h4>",
				/* html */ `<p><strong>Action:</strong> ${metadata.action}</p>`,
				/* html */ `<p><strong>Source Network:</strong> ${metadata.sourceNetwork}</p>`,
				/* html */ `<p><strong>Target Network:</strong> ${metadata.targetNetwork}</p>`,
				metadata.token &&
					/* html */ `<p><strong>Token name:</strong> ${metadata.token.name}</p>`,
				metadata.token &&
					/* html */ `<p><strong>Token Symbol:</strong> ${metadata.token.symbol}</p>`,
				metadata.token &&
					/* html */ `<p><strong>Token Value:</strong> ${metadata.token.value}</p>`,
				metadata.token &&
					/* html */ `<p><strong>Token Address:</strong> ${metadata.token.address}</p>`,
			]);
			break;
		}
	}

	return buildSectionFooterHTML(joint, action);
};

const renderExchange = (action: Action) => {
	let joint = "";
	const { type } = action;
	const tag = "exchange";
	switch (type) {
		case "liquidity": {
			const metadata = extractMetadata(tag, type, action);
			if (!metadata) {
				break;
			}
			joint += buildHTML([
				/* html */ "<h4>Exchange Liquidity</h4>",
				/* html */ `<p><strong>Action:</strong> ${metadata.action}</p>`,
				/* html */ `<p>
            <table>
              <thead>
                <tr>
                  <th>Address</th>
                  <th>Value</th>
                  <th>Name</th>
                  <th>Symbol</th>
                  <th>Decimals</th>
                  <th>Standard</th>
                </tr>
              </thead>
              <tbody>
                ${metadata.tokens.map(
									(token) => /* html */ `<tr>
                  <td>${token.address}</td>
                  <td>${token.value}</td>
                  <td>${token.name}</td>
                  <td>${token.symbol}</td>
                  <td>${token.decimals}</td>
                  <td>${token.standard}</td>
                </tr>`,
								)}
              </tbody>
          </table>
        </p>`,
			]);
			break;
		}
		case "staking": {
			const metadata = extractMetadata(tag, type, action);
			if (!metadata) {
				break;
			}
			joint += buildHTML([
				/* html */ "<h4>Exchange Liquidity</h4>",
				/* html */ `<p><strong>Action:</strong> ${metadata.action}</p>`,
				metadata.token &&
					/* html */ `<p>

           <strong>Token:</strong>
           <ul>
            <li><strong>Address:</strong> ${metadata.token.address}</li>
            <li><strong>Value:</strong> ${metadata.token.value}</li>
            <li><strong>Name:</strong> ${metadata.token.name}</li>
            <li><strong>Symbol:</strong> ${metadata.token.symbol}</li>
            <li><strong>Decimals:</strong> ${metadata.token.decimals}</li>
            <li><strong>Standard:</strong> ${metadata.token.standard}</li>
           </ul>
        </p>`,
			]);
			break;
		}
		case "swap": {
			const metadata = extractMetadata(tag, type, action);
			if (!metadata) {
				break;
			}
			joint += buildHTML([
				/* html */ "<h4>Exchange Swap</h4>",
				/* html */ metadata.from &&
					`<p><strong>From:</strong> ${metadata.from.address}</p>`,
				/* html */ metadata.to &&
					`<p><strong>To:</strong> ${metadata.to?.address}</p>`,
			]);
		}
	}

	return buildSectionFooterHTML(joint, action);
};

const renderMetaverseTagContent = (action: Action) => {
	let joint = "";
	const { from, to, type } = action;
	const tag = "metaverse";
	switch (type) {
		case "burn": {
			const metadata = extractMetadata(tag, type, action);
			if (!metadata) {
				break;
			}
			joint += buildHTML([
				/* html */ "<h4>Metaverse Burn</h4>",
				/* html */ `<p><strong>Name:</strong> ${metadata.name}</p>`,
				/* html */ `<p><strong>Address:</strong> ${metadata.address}</p>`,
				/* html */ `<p><strong>Symbol:</strong> ${metadata.symbol}</p>`,
				/* html */ `<p><strong>Value:</strong> ${metadata.value}</p>`,
				/* html */ `<p>${from} --> ${to}</p>`,
			]);
			break;
		}
		case "trade": {
			const metadata = extractMetadata(tag, type, action);
			if (!metadata) {
				break;
			}
			joint += buildHTML([
				/* html */ "<h4>Metaverse Trade</h4>",
				/* html */ `<p><strong>Name:</strong> ${metadata.name}</p>`,
				/* html */ `<p><strong>Address:</strong> ${metadata.address}</p>`,
				/* html */ `<p><strong>Symbol:</strong> ${metadata.symbol}</p>`,
				/* html */ `<p><strong>Value:</strong> ${metadata.value}</p>`,
				/* html */ `<p>${from} --> ${to}</p>`,
			]);
			break;
		}
		case "mint":
			{
				const metadata = extractMetadata(tag, type, action);
				if (!metadata) {
					break;
				}
				joint += buildHTML([
					/* html */ "<h4>Metaverse Mint</h4>",
					/* html */ `<p><strong>Name:</strong> ${metadata.name}</p>`,
					/* html */ `<p><strong>Address:</strong> ${metadata.address}</p>`,
					/* html */ `<p><strong>Symbol:</strong> ${metadata.symbol}</p>`,
					/* html */ `<p><strong>Value:</strong> ${metadata.value}</p>`,
					/* html */ `<p>${from} --> ${to}</p>`,
				]);
			}
			break;
		case "transfer": {
			const metadata = extractMetadata(tag, type, action);
			if (!metadata) {
				break;
			}
			joint += buildHTML([
				/* html */ "<h4>Metaverse Transfer</h4>",
				/* html */ `<p><strong>Name:</strong> ${metadata.name}</p>`,
				/* html */ `<p><strong>Address:</strong> ${metadata.address}</p>`,
				/* html */ `<p><strong>Symbol:</strong> ${metadata.symbol}</p>`,
				/* html */ `<p><strong>Value:</strong> ${metadata.value}</p>`,
				/* html */ `<p>${from} --> ${to}</p>`,
			]);
		}
	}

	return buildSectionFooterHTML(joint, action);
};
const renderCollectibleTagContent = (action: Action) => {
	let joint = "";
	const { from, to, type } = action;
	const tag = "collectible";
	switch (type) {
		case "approval": {
			const metadata = extractMetadata(tag, type, action);
			if (!metadata) {
				break;
			}
			joint += buildHTML([
				/* html */ "<h4>Collectible Approval</h4>",
				/* html */ `<p><strong>Name:</strong> ${metadata.name}</p>`,
				/* html */ `<p><strong>Address:</strong> ${metadata.address}</p>`,
				/* html */ `<p><strong>Symbol:</strong> ${metadata.symbol}</p>`,
				/* html */ `<p><strong>Value:</strong> ${metadata.value}</p>`,
				/* html */ `<p>${from} --> ${to}</p>`,
			]);

			break;
		}
		case "burn": {
			const metadata = extractMetadata(tag, type, action);
			if (!metadata) {
				break;
			}
			joint += buildHTML([
				/* html */ "<h4>Collectible Burn</h4>",
				/* html */ `<p><strong>Name:</strong> ${metadata.name}</p>`,
				/* html */ `<p><strong>Address:</strong> ${metadata.address}</p>`,
				/* html */ `<p><strong>Symbol:</strong> ${metadata.symbol}</p>`,
				/* html */ `<p><strong>Value:</strong> ${metadata.value}</p>`,
				/* html */ `<p>${from} --> ${to}</p>`,
			]);
			break;
		}
		case "trade": {
			const metadata = extractMetadata(tag, type, action);
			if (!metadata) {
				break;
			}
			joint += buildHTML([
				/* html */ "<h4>Collectible Trade</h4>",
				/* html */ `<p><strong>Name:</strong> ${metadata.name}</p>`,
				/* html */ `<p><strong>Address:</strong> ${metadata.address}</p>`,
				/* html */ `<p><strong>Symbol:</strong> ${metadata.symbol}</p>`,
				/* html */ `<p><strong>Value:</strong> ${metadata.value}</p>`,
				/* html */ `<p>${from} --> ${to}</p>`,
			]);
			break;
		}
		case "mint":
			{
				const metadata = extractMetadata(tag, type, action);
				if (!metadata) {
					break;
				}
				joint += buildHTML([
					/* html */ "<h4>Collectible Mint</h4>",
					/* html */ `<p><strong>Name:</strong> ${metadata.name}</p>`,
					/* html */ `<p><strong>Address:</strong> ${metadata.address}</p>`,
					/* html */ `<p><strong>Symbol:</strong> ${metadata.symbol}</p>`,
					/* html */ `<p><strong>Value:</strong> ${metadata.value}</p>`,
					/* html */ `<p>${from} --> ${to}</p>`,
				]);
			}
			break;
		case "transfer": {
			const metadata = extractMetadata(tag, type, action);
			if (!metadata) {
				break;
			}
			joint += buildHTML([
				/* html */ "<h4>Collectible Transfer</h4>",
				/* html */ `<p><strong>Name:</strong> ${metadata.name}</p>`,
				/* html */ `<p><strong>Address:</strong> ${metadata.address}</p>`,
				/* html */ `<p><strong>Symbol:</strong> ${metadata.symbol}</p>`,
				/* html */ `<p><strong>Value:</strong> ${metadata.value}</p>`,
				/* html */ `<p>${from} --> ${to}</p>`,
			]);
		}
	}

	return buildSectionFooterHTML(joint, action);
};

const renderSocialTagContent = (action: Action) => {
	let joint = "";
	const { type } = action;
	const tag = "social";
	switch (type) {
		case "profile": {
			break;
		}
		case "mint": {
			const metadata = extractMetadata(tag, type, action);
			if (!metadata) {
				break;
			}
			joint += buildHTML([
				/* html */ `<small>${metadata.handle} mited a post</small><br/>`,
				/* html */ metadata.body,
			]);
			break;
		}
		case "delete": {
			const metadata = extractMetadata(tag, type, action);
			if (!metadata) {
				break;
			}
			joint += buildHTML([
				/* html */ `<small>${metadata.handle} deleted a post</small><br/>`,
			]);
			break;
		}
		case "post": {
			const metadata = extractMetadata(tag, type, action);
			if (!metadata || !metadata.body) {
				break;
			}
			joint += metadata.body;
			break;
		}
		case "comment": {
			const metadata = extractMetadata(tag, type, action);
			if (!metadata || !metadata.target) {
				break;
			}
			joint += buildHTML([
				/* html */ `<small>${metadata.handle} commented on ${metadata.target.handle}'s post</small><br/>`,
				/* html */ `<blockquote>${metadata.target.body}</blockquote>`,
				/* html */ `RT: ${metadata.body}`,
				/* html */ metadata.media
					?.map(
						(media) =>
							`<img src="${media.address}" style="max-width:100%; height:auto;"/>`,
					)
					.join(""),
			]);

			break;
		}
		case "reward": {
			const metadata = extractMetadata(tag, type, action);
			if (!metadata) {
				break;
			}
			joint += buildHTML([
				/* html */ `<small>${metadata.handle} rewarded a post</small><br/>`,
				/* html */ metadata.body,
			]);
			break;
		}
		case "revise": {
			const metadata = extractMetadata(tag, type, action);
			if (!metadata) {
				break;
			}
			joint += buildHTML([
				/* html */ `<small>${metadata.handle} revised a post</small><br/>`,
				/* html */ metadata.body,
			]);

			break;
		}
		case "proxy": {
			break;
		}
		case "share": {
			const metadata = extractMetadata(tag, type, action);
			if (!metadata || !metadata.target) {
				break;
			}

			joint += buildHTML([
				/* html */ `<small>${metadata.handle} shared a post by <a href="${metadata.target.authorUrl}" target="_blank">${metadata.target.handle}</a></small><br/>`,
				/* html */ metadata.target?.body,
				metadata.target.media
					?.map(
						(media) =>
							`<img src="${media.address}" style="max-width:100%; height:auto;"/>`,
					)
					.join(""),
			]);
			break;
		}
	}

	return joint;
};

function extractMetadata<T1 extends string, T2 extends string>(
	_tag: T1,
	_type: T2,
	data: Action,
): GetRSS3DataMetadata<T1, T2> | null {
	const metadata = data.metadata;
	if (!metadata) {
		return null;
	}
	return data.metadata as GetRSS3DataMetadata<T1, T2>;
}

function buildHTML(arr: (string | boolean | undefined | null)[]): string {
	return arr.filter(Boolean).join("\n");
}

const buildSectionFooterHTML = (string: string, action: Action) =>
	buildHTML([
		string,
		!!action.platform && `<p><strong>Platform:</strong> ${action.platform}</p>`,

		/* html */ `<p><strong>Related URLs:</strong>
      <ul><li>${action.relatedUrls
				.map((url) => `<a href="${url}" target="_blank">${url}</a>`)
				.join("</li><li>")}</li></ul></p>`,
	]);

export type RSS3DataModels = {
	CollectibleApproval: CollectibleApproval;
	CollectibleBurn: CollectibleBurn;
	CollectibleMint: CollectibleMint;
	CollectibleTrade: CollectibleTrade;
	CollectibleTransfer: CollectibleTransfer;
	MetaverseBurn: MetaverseBurn;
	MetaverseMint: MetaverseMint;
	MetaverseTrade: MetaverseTrade;
	MetaverseTransfer: MetaverseTransfer;
	SocialComment: SocialComment;
	SocialDelete: SocialDelete;
	SocialMint: SocialMint;
	SocialPost: SocialPost;
	SocialProfile: SocialProfile;
	SocialProxy: SocialProxy;
	SocialRevise: SocialRevise;
	SocialReward: SocialReward;
	SocialShare: SocialShare;
	StakeStaking: StakeStaking;
	StakeTransaction: StakeTransaction;
	StakerProfitSnapshot: StakerProfitSnapshot;
	TransactionApproval: TransactionApproval;
	TransactionBridge: TransactionBridge;
	TransactionBurn: TransactionBurn;
	TransactionEvent: TransactionEvent;
	TransactionMint: TransactionMint;
	TransactionTransfer: TransactionTransfer;
	ExchangeLiquidity: ExchangeLiquidity;
	ExchangeStaking: ExchangeStaking;
	ExchangeSwap: ExchangeSwap;
};
export type GetRSS3DataMetadata<
	FirstKey extends string,
	SecondKey extends string,
> = `${Capitalize<FirstKey>}${Capitalize<SecondKey>}` extends keyof RSS3DataModels
	? RSS3DataModels[`${Capitalize<FirstKey>}${Capitalize<SecondKey>}`]
	: null;
