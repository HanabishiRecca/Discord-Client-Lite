import { URLSearchParams } from 'url';
import { Request, SetDefOptions } from './request.js';
import type { RequestOptions } from './request';
import type * as helpers from './helpers';
import type * as types from './types';

export const setDefaultRequestOptions = SetDefOptions;

const
    Path = (...paths: string[]) => paths.join('/'),
    Param = (params: any) => String(new URLSearchParams(params)),
    Query = (params: any) => params ? '?' + Param(params) : '';

const enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
}

const enum PATHS {
    active = 'active',
    applications = 'applications',
    archived = 'archived',
    auditLogs = 'audit-logs',
    bans = 'bans',
    bulk_delete = 'bulk-delete',
    callback = 'callback',
    channels = 'channels',
    commands = 'commands',
    connections = 'connections',
    crosspost = 'crosspost',
    emojis = 'emojis',
    followers = 'followers',
    github = 'github',
    guilds = 'guilds',
    integrations = 'integrations',
    interactions = 'interactions',
    invites = 'invites',
    me = '@me',
    member = 'member',
    members = 'members',
    messages = 'messages',
    nick = 'nick',
    oauth2 = 'oauth2',
    original = '@original',
    permissions = 'permissions',
    pins = 'pins',
    preview = 'preview',
    private = 'private',
    prune = 'prune',
    public = 'public',
    reactions = 'reactions',
    recipients = 'recipients',
    regions = 'regions',
    roles = 'roles',
    scheduled_events = 'scheduled-events',
    search = 'search',
    slack = 'slack',
    stage_instances = 'stage-instances',
    sticker_packs = 'sticker-packs',
    stickers = 'stickers',
    templates = 'templates',
    thread_members = 'thread-members',
    threads = 'threads',
    token = 'token',
    typing = 'typing',
    users = 'users',
    vanity_url = 'vanity-url',
    voice = 'voice',
    voice_states = 'voice-states',
    webhooks = 'webhooks',
    welcome_screen = 'welcome-screen',
    widget = 'widget',
    widget_json = 'widget.json',
    widget_png = 'widget.png',
}

export const Channel = {
    Create: <T extends types.GuildChannel>(guild_id: string, params: {
        name: string;
        position?: number;
        permission_overwrites?: types.PermissionsOverwrite[];
    } & ((T extends types.GuildTextChannel ? {
        type?: (
            | helpers.ChannelTypes.GUILD_TEXT
            | helpers.ChannelTypes.GUILD_NEWS
        );
        topic?: string;
        rate_limit_per_user?: number;
        parent_id?: string;
        nsfw?: boolean;
    } : never) | (T extends types.GuildCategory ? {
        type: helpers.ChannelTypes.GUILD_CATEGORY;
    } : never) | (T extends types.GuildVoiceChannel ? {
        type: (
            | helpers.ChannelTypes.GUILD_VOICE
            | helpers.ChannelTypes.GUILD_STAGE_VOICE
        );
        bitrate?: number;
        user_limit?: number;
        parent_id?: string;
    } : never)), requestOptions?: RequestOptions) =>
        Request<T>(METHODS.POST, Path(PATHS.guilds, guild_id, PATHS.channels), requestOptions, params),

    Get: <T extends types.GuildChannel>(channel_id: string, requestOptions?: RequestOptions) =>
        Request<T>(METHODS.GET, Path(PATHS.channels, channel_id), requestOptions),

    Modify: <T extends types.GuildChannel>(id: string, params: {
        name?: string;
        position?: number | null;
        permission_overwrites?: types.PermissionsOverwrite[] | null;
    } & (T extends types.GuildTextChannel ? {
        type?: types.GuildTextChannel['type'];
        topic?: string | null;
        nsfw?: boolean | null;
        rate_limit_per_user?: number | null;
        parent_id?: string | null;
        default_auto_archive_duration?: helpers.ThreadArchiveDurations | null;
    } : never) & (T extends types.GuildVoiceChannel ? {
        bitrate?: number | null;
        user_limit?: number | null;
        parent_id?: string | null;
        rtc_region?: string | null;
        video_quality_mode?: helpers.VideoQualityModes;
    } : never), requestOptions?: RequestOptions) =>
        Request<T>(METHODS.PATCH, Path(PATHS.channels, id), requestOptions, params),

    Delete: <T extends types.GuildChannel>(channel_id: string, requestOptions?: RequestOptions) =>
        Request<T>(METHODS.DELETE, Path(PATHS.channels, channel_id), requestOptions),

    GetMessages: (channel_id: string, params?: {
        limit?: number;
    } & ({
        around?: string;
        before?: undefined;
        after?: undefined;
    } | {
        around?: undefined;
        before?: string;
        after?: undefined;
    } | {
        around?: undefined;
        before?: undefined;
        after?: string;
    }), requestOptions?: RequestOptions) =>
        Request<types.Message[]>(METHODS.GET, Path(PATHS.channels, channel_id, PATHS.messages) + Query(params), requestOptions),

    BulkDeleteMessages: (channel_id: string, params: {
        messages: string[];
    }, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.POST, Path(PATHS.channels, channel_id, PATHS.messages, PATHS.bulk_delete), requestOptions, params),

    EditPermissions: (channel_id: string, overwrite_id: string, params: {
        allow?: string | null;
        deny?: string | null;
        type: helpers.PermissionsOverwriteTypes;
    }, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.PUT, Path(PATHS.channels, channel_id, PATHS.permissions, overwrite_id), requestOptions, params),

    GetInvites: (channel_id: string, requestOptions?: RequestOptions) =>
        Request<(types.Invite & types.InviteMetadata)[]>(METHODS.GET, Path(PATHS.channels, channel_id, PATHS.invites), requestOptions),

    DeletePermission: (channel_id: string, overwrite_id: string, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.DELETE, Path(PATHS.channels, channel_id, PATHS.permissions, overwrite_id), requestOptions),

    FollowNews: (channel_id: string, params: {
        webhook_channel_id: string;
    }, requestOptions?: RequestOptions) =>
        Request<types.FollowedChannel>(METHODS.POST, Path(PATHS.channels, channel_id, PATHS.followers), requestOptions, params),

    TriggerTypingIndicator: (channel_id: string, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.POST, Path(PATHS.channels, channel_id, PATHS.typing), requestOptions),

    GetPinnedMessages: (channel_id: string, requestOptions?: RequestOptions) =>
        Request<types.Message[]>(METHODS.GET, Path(PATHS.channels, channel_id, PATHS.pins), requestOptions),

    GetWebhooks: (channel_id: string, requestOptions?: RequestOptions) =>
        Request<types.Webhook[]>(METHODS.GET, Path(PATHS.channels, channel_id, PATHS.webhooks), requestOptions),

    ListPublicArchivedThreads: (channel_id: string, params?: {
        before?: string;
        limit?: number;
    }, requestOptions?: RequestOptions) =>
        Request<{
            threads: types.Thread[];
            members: types.ThreadMember[];
            has_more: boolean;
        }>(METHODS.GET, Path(PATHS.channels, channel_id, PATHS.threads, PATHS.archived, PATHS.public) + Query(params), requestOptions),

    ListPrivateArchivedThreads: (channel_id: string, params?: {
        before?: string;
        limit?: number;
    }, requestOptions?: RequestOptions) =>
        Request<{
            threads: types.Thread[];
            members: types.ThreadMember[];
            has_more: boolean;
        }>(METHODS.GET, Path(PATHS.channels, channel_id, PATHS.threads, PATHS.archived, PATHS.private) + Query(params), requestOptions),

    ListJoinedPrivateArchivedThreads: (channel_id: string, params?: {
        before?: string;
        limit?: number;
    }, requestOptions?: RequestOptions) =>
        Request<{
            threads: types.Thread[];
            members: types.ThreadMember[];
            has_more: boolean;
        }>(METHODS.GET, Path(PATHS.channels, channel_id, PATHS.users, PATHS.me, PATHS.threads, PATHS.archived, PATHS.private) + Query(params), requestOptions),
};

export const Message = {
    Get: (channel_id: string, message_id: string, requestOptions?: RequestOptions) =>
        Request<types.Message>(METHODS.GET, Path(PATHS.channels, channel_id, PATHS.messages, message_id), requestOptions),

    Create: (channel_id: string, params: {
        content?: string;
        nonce?: number | string;
        tts?: string;
        embeds?: types.Embed[];
        allowed_mentions?: types.AllowedMentions;
        message_reference?: {
            message_id: string;
            channel_id?: string;
            guild_id?: string;
            fail_if_not_exists?: boolean;
        };
        components?: types.ActionRow[];
        flags?: helpers.MessageFlags;
    }, requestOptions?: RequestOptions) =>
        Request<types.Message>(METHODS.POST, Path(PATHS.channels, channel_id, PATHS.messages), requestOptions, params),

    Crosspost: (channel_id: string, message_id: string, requestOptions?: RequestOptions) =>
        Request<types.Message>(METHODS.POST, Path(PATHS.channels, channel_id, PATHS.messages, message_id, PATHS.crosspost), requestOptions),

    Delete: (channel_id: string, message_id: string, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.DELETE, Path(PATHS.channels, channel_id, PATHS.messages, message_id), requestOptions),

    Edit: (channel_id: string, message_id: string, params: {
        content?: string;
        embeds?: types.Embed[];
        flags?: helpers.MessageFlags;
        allowed_mentions?: types.AllowedMentions;
        components?: types.ActionRow[];
        attachments?: types.Attachment[];
    }, requestOptions?: RequestOptions) =>
        Request<types.Message>(METHODS.PATCH, Path(PATHS.channels, channel_id, PATHS.messages, message_id), requestOptions, params),

    Pin: (channel_id: string, message_id: string, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.PUT, Path(PATHS.channels, channel_id, PATHS.pins, message_id), requestOptions),

    Unpin: (channel_id: string, message_id: string, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.DELETE, Path(PATHS.channels, channel_id, PATHS.pins, message_id), requestOptions),

    GetReactions: (channel_id: string, message_id: string, emoji: string, params?: {
        after?: string;
        limit?: number;
    }, requestOptions?: RequestOptions) =>
        Request<types.User[]>(METHODS.GET, Path(PATHS.channels, channel_id, PATHS.messages, message_id, PATHS.reactions, encodeURIComponent(emoji)) + Query(params), requestOptions),

    DeleteAllReactions: (channel_id: string, message_id: string, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.DELETE, Path(PATHS.channels, channel_id, PATHS.messages, message_id, PATHS.reactions), requestOptions),

    DeleteAllReactionsForEmoji: (channel_id: string, message_id: string, emoji: string, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.DELETE, Path(PATHS.channels, channel_id, PATHS.messages, message_id, PATHS.reactions, encodeURIComponent(emoji)), requestOptions),
};

export const Reaction = {
    Add: (channel_id: string, message_id: string, emoji: string, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.PUT, Path(PATHS.channels, channel_id, PATHS.messages, message_id, PATHS.reactions, encodeURIComponent(emoji), PATHS.me), requestOptions),

    DeleteOwn: (channel_id: string, message_id: string, emoji: string, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.DELETE, Path(PATHS.channels, channel_id, PATHS.messages, message_id, PATHS.reactions, encodeURIComponent(emoji), PATHS.me), requestOptions),

    Delete: (channel_id: string, message_id: string, user_id: string, emoji: string, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.DELETE, Path(PATHS.channels, channel_id, PATHS.messages, message_id, PATHS.reactions, encodeURIComponent(emoji), user_id), requestOptions),
};

export const GroupDM = {
    AddRecipient: (channel_id: string, user_id: string, params: {
        access_token: string;
        nick: string;
    }, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.PUT, Path(PATHS.channels, channel_id, PATHS.recipients, user_id), requestOptions, params),

    RemoveRecipient: (channel_id: string, user_id: string, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.DELETE, Path(PATHS.channels, channel_id, PATHS.recipients, user_id), requestOptions),

    Modify: (id: string, params: {
        name?: string;
        icon?: string;
    }, requestOptions?: RequestOptions) =>
        Request<types.GroupDMChannel>(METHODS.PATCH, Path(PATHS.channels, id), requestOptions, params),
};

export const Guild = {
    GetAuditLog: (guild_id: string, params?: {
        user_id?: string;
        action_type?: number;
        before?: string;
        limit?: number;
    }, requestOptions?: RequestOptions) =>
        Request<types.AuditLog>(METHODS.GET, Path(PATHS.guilds, guild_id, PATHS.auditLogs) + Query(params), requestOptions),

    ListEmojis: (guild_id: string, requestOptions?: RequestOptions) =>
        Request<types.Emoji[]>(METHODS.GET, Path(PATHS.guilds, guild_id, PATHS.emojis), requestOptions),

    Create: (params: {
        name: string;
        icon?: string;
        verification_level?: helpers.VerificationLevels;
        default_message_notifications?: helpers.DefaultMessageNotificationLevels;
        explicit_content_filter?: helpers.ExplicitContentFilterLevels;
        roles?: types.Role[];
        channels?: types.GuildChannel[];
        afk_channel_id?: string;
        afk_timeout?: number;
        system_channel_id?: string;
        system_channel_flags?: helpers.SystemChannelFlags;
    }, requestOptions?: RequestOptions) =>
        Request<types.Guild>(METHODS.POST, PATHS.guilds, requestOptions, params),

    Get: (guild_id: string, params?: {
        with_counts?: boolean;
    }, requestOptions?: RequestOptions) =>
        Request<types.Guild>(METHODS.GET, Path(PATHS.guilds, guild_id) + Query(params), requestOptions),

    GetPreview: (guild_id: string, requestOptions?: RequestOptions) =>
        Request<types.GuildPreview>(METHODS.GET, Path(PATHS.guilds, guild_id, PATHS.preview), requestOptions),

    Modify: (guild_id: string, params: {
        name?: string;
        verification_level?: helpers.VerificationLevels;
        default_message_notifications?: helpers.DefaultMessageNotificationLevels;
        explicit_content_filter?: helpers.ExplicitContentFilterLevels;
        afk_channel_id?: string | null;
        afk_timeout?: number;
        icon?: string | null;
        owner_id?: string;
        splash?: string | null;
        discovery_splash?: string | null;
        banner?: string | null;
        system_channel_id?: string | null;
        system_channel_flags?: helpers.SystemChannelFlags;
        rules_channel_id?: string | null;
        public_updates_channel_id?: string | null;
        preferred_locale?: string | null;
        features?: helpers.GuildFeatures[];
        description?: string | null;
        premium_progress_bar_enabled?: boolean;
    }, requestOptions?: RequestOptions) =>
        Request<types.Guild>(METHODS.PATCH, Path(PATHS.guilds, guild_id), requestOptions, params),

    Delete: (guild_id: string, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.DELETE, Path(PATHS.guilds, guild_id), requestOptions),

    GetChannels: (guild_id: string, requestOptions?: RequestOptions) =>
        Request<types.GuildChannel[]>(METHODS.GET, Path(PATHS.guilds, guild_id, PATHS.channels), requestOptions),

    ModifyChannelPositions: (guild_id: string, params: ({
        id: string;
        position: number | null;
    })[], requestOptions?: RequestOptions) =>
        Request<null>(METHODS.PATCH, Path(PATHS.guilds, guild_id, PATHS.channels), requestOptions, params),

    ListActiveThreads: (guild_id: string, requestOptions?: RequestOptions) =>
        Request<{
            threads: types.Thread[];
            members: types.ThreadMember[];
        }>(METHODS.GET, Path(PATHS.guilds, guild_id, PATHS.threads, PATHS.active), requestOptions),

    ListMembers: (guild_id: string, params?: {
        limit?: number;
        after?: string;
    }, requestOptions?: RequestOptions) =>
        Request<types.Member[]>(METHODS.GET, Path(PATHS.guilds, guild_id, PATHS.members) + Query(params), requestOptions),

    SearchMembers: (guild_id: string, params: {
        query: number;
        limit?: number;
    }, requestOptions?: RequestOptions) =>
        Request<types.Member[]>(METHODS.GET, Path(PATHS.guilds, guild_id, PATHS.members, PATHS.search) + Query(params), requestOptions),

    GetBans: (guild_id: string, params?: {
        limit?: number;
    } & ({
        before?: string;
        after?: undefined;
    } | {
        before?: undefined;
        after?: string;
    }), requestOptions?: RequestOptions) =>
        Request<types.Ban[]>(METHODS.GET, Path(PATHS.guilds, guild_id, PATHS.bans) + Query(params), requestOptions),

    GetRoles: (guild_id: string, requestOptions?: RequestOptions) =>
        Request<types.Role[]>(METHODS.GET, Path(PATHS.guilds, guild_id, PATHS.roles), requestOptions),

    ModifyRolePositions: (guild_id: string, params: ({
        id: string;
        position?: number | null;
    })[], requestOptions?: RequestOptions) =>
        Request<types.Role[]>(METHODS.PATCH, Path(PATHS.guilds, guild_id, PATHS.roles), requestOptions, params),

    GetPruneCount: (guild_id: string, params?: {
        days?: number;
        include_roles?: string;
    }, requestOptions?: RequestOptions) =>
        Request<{ pruned: number; }>(METHODS.GET, Path(PATHS.guilds, guild_id, PATHS.prune) + Query(params), requestOptions),

    Prune: (guild_id: string, params?: {
        days?: number;
        compute_prune_count?: boolean;
        include_roles?: string;
    }, requestOptions?: RequestOptions) =>
        Request<{ pruned: number | null; }>(METHODS.POST, Path(PATHS.guilds, guild_id, PATHS.prune), requestOptions, params),

    GetVoiceRegions: (guild_id: string, requestOptions?: RequestOptions) =>
        Request<types.VoiceRegion[]>(METHODS.GET, Path(PATHS.guilds, guild_id, PATHS.regions), requestOptions),

    GetInvites: (guild_id: string, requestOptions?: RequestOptions) =>
        Request<(types.Invite & types.InviteMetadata)[]>(METHODS.GET, Path(PATHS.guilds, guild_id, PATHS.invites), requestOptions),

    GetIntegrations: (guild_id: string, requestOptions?: RequestOptions) =>
        Request<types.Integration[]>(METHODS.GET, Path(PATHS.guilds, guild_id, PATHS.integrations), requestOptions),

    DeleteIntegration: (guild_id: string, integration_id: string, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.DELETE, Path(PATHS.guilds, guild_id, PATHS.integrations, integration_id), requestOptions),

    GetVanityURL: (guild_id: string, requestOptions?: RequestOptions) =>
        Request<{ code: string; uses: number; }>(METHODS.GET, Path(PATHS.guilds, guild_id, PATHS.vanity_url), requestOptions),

    CreateFromTemplate: (template_code: string, params: {
        name: string;
        icon?: string;
    }, requestOptions?: RequestOptions) =>
        Request<types.Guild>(METHODS.POST, Path(PATHS.guilds, PATHS.templates, template_code), requestOptions, params),

    GetTemplates: (guild_id: string, requestOptions?: RequestOptions) =>
        Request<types.Template[]>(METHODS.GET, Path(PATHS.guilds, guild_id, PATHS.templates), requestOptions),

    GetWebhooks: (guild_id: string, requestOptions?: RequestOptions) =>
        Request<types.Webhook[]>(METHODS.GET, Path(PATHS.guilds, guild_id, PATHS.webhooks), requestOptions),

    ListStickers: (guild_id: string, requestOptions?: RequestOptions) =>
        Request<types.Sticker[]>(METHODS.GET, Path(PATHS.guilds, guild_id, PATHS.stickers), requestOptions),

    ListScheduledEvents: (guild_id: string, params?: {
        with_user_count?: boolean;
    }, requestOptions?: RequestOptions) =>
        Request<types.ScheduledEvent[]>(METHODS.GET, Path(PATHS.guilds, guild_id, PATHS.scheduled_events) + Query(params), requestOptions),
};

export const Emoji = {
    Get: (guild_id: string, emoji_id: string, requestOptions?: RequestOptions) =>
        Request<types.Emoji>(METHODS.GET, Path(PATHS.guilds, guild_id, PATHS.emojis, emoji_id), requestOptions),

    Add: (guild_id: string, params: {
        name: string;
        image: string;
        roles?: string[];
    }, requestOptions?: RequestOptions) =>
        Request<types.Emoji>(METHODS.POST, Path(PATHS.guilds, guild_id, PATHS.emojis), requestOptions, params),

    Modify: (guild_id: string, emoji_id: string, params: {
        name?: string;
        roles?: string[] | null;
    }, requestOptions?: RequestOptions) =>
        Request<types.Emoji>(METHODS.PATCH, Path(PATHS.guilds, guild_id, PATHS.emojis, emoji_id), requestOptions, params),

    Delete: (guild_id: string, emoji_id: string, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.DELETE, Path(PATHS.guilds, guild_id, PATHS.emojis, emoji_id), requestOptions),
};

export const Member = {
    Get: (guild_id: string, user_id: string, requestOptions?: RequestOptions) =>
        Request<types.Member>(METHODS.GET, Path(PATHS.guilds, guild_id, PATHS.members, user_id), requestOptions),

    Add: (guild_id: string, user_id: string, params: {
        access_token: string;
        nick?: string;
        roles?: string[];
        mute?: boolean;
        deaf?: boolean;
    }, requestOptions?: RequestOptions) =>
        Request<types.Member | null>(METHODS.PUT, Path(PATHS.guilds, guild_id, PATHS.members, user_id), requestOptions, params),

    Modify: (guild_id: string, user_id: string, params: {
        nick?: string | null;
        roles?: string[] | null;
        mute?: boolean | null;
        deaf?: boolean | null;
        channel_id?: string | null;
        communication_disabled_until?: string | null;
    }, requestOptions?: RequestOptions) =>
        Request<types.Member>(METHODS.PATCH, Path(PATHS.guilds, guild_id, PATHS.members, user_id), requestOptions, params),

    ModifyCurrent: (guild_id: string, params: {
        nick?: string | null;
    }, requestOptions?: RequestOptions) =>
        Request<types.Member>(METHODS.PATCH, Path(PATHS.guilds, guild_id, PATHS.members, PATHS.me), requestOptions, params),

    AddRole: (guild_id: string, user_id: string, role_id: string, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.PUT, Path(PATHS.guilds, guild_id, PATHS.members, user_id, PATHS.roles, role_id), requestOptions),

    RemoveRole: (guild_id: string, user_id: string, role_id: string, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.DELETE, Path(PATHS.guilds, guild_id, PATHS.members, user_id, PATHS.roles, role_id), requestOptions),

    Remove: (guild_id: string, user_id: string, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.DELETE, Path(PATHS.guilds, guild_id, PATHS.members, user_id), requestOptions),
};

export const Ban = {
    Get: (guild_id: string, user_id: string, requestOptions?: RequestOptions) =>
        Request<types.Ban>(METHODS.GET, Path(PATHS.guilds, guild_id, PATHS.bans, user_id), requestOptions),

    Add: (guild_id: string, user_id: string, params?: {
        delete_message_days?: number;
    }, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.PUT, Path(PATHS.guilds, guild_id, PATHS.bans, user_id), requestOptions, params),

    Remove: (guild_id: string, user_id: string, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.DELETE, Path(PATHS.guilds, guild_id, PATHS.bans, user_id), requestOptions),
};

export const Role = {
    Create: (guild_id: string, params?: {
        name?: string;
        permissions?: string;
        color?: number;
        hoist?: boolean;
        icon?: string;
        unicode_emoji?: string;
        mentionable?: boolean;
    }, requestOptions?: RequestOptions) =>
        Request<types.Role>(METHODS.POST, Path(PATHS.guilds, guild_id, PATHS.roles), requestOptions, params),

    Modify: (guild_id: string, role_id: string, params?: {
        name?: string | null;
        permissions?: string | null;
        color?: number | null;
        hoist?: boolean | null;
        icon?: string | null;
        unicode_emoji?: string | null;
        mentionable?: boolean | null;
    }, requestOptions?: RequestOptions) =>
        Request<types.Role>(METHODS.PATCH, Path(PATHS.guilds, guild_id, PATHS.roles, role_id), requestOptions, params),

    Delete: (guild_id: string, role_id: string, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.DELETE, Path(PATHS.guilds, guild_id, PATHS.roles, role_id), requestOptions),
};

export const Widget = {
    GetSettings: (guild_id: string, requestOptions?: RequestOptions) =>
        Request<types.GuildWidgetSettings>(METHODS.GET, Path(PATHS.guilds, guild_id, PATHS.widget), requestOptions),

    Modify: (guild_id: string, params: types.GuildWidgetSettings, requestOptions?: RequestOptions) =>
        Request<types.GuildWidgetSettings>(METHODS.PATCH, Path(PATHS.guilds, guild_id, PATHS.widget), requestOptions, params),

    Get: (guild_id: string, requestOptions?: RequestOptions) =>
        Request<types.GuildWidget>(METHODS.GET, Path(PATHS.guilds, guild_id, PATHS.widget_json), requestOptions),

    GetImage: (guild_id: string, params?: {
        style?: helpers.WidgetStyleOptions;
    }, requestOptions?: RequestOptions) =>
        Request<Buffer>(METHODS.GET, Path(PATHS.guilds, guild_id, PATHS.widget_png) + Query(params), requestOptions),
};

export const WelcomeScreen = {
    Get: (guild_id: string, requestOptions?: RequestOptions) =>
        Request<types.WelcomeScreen>(METHODS.GET, Path(PATHS.guilds, guild_id, PATHS.welcome_screen), requestOptions),

    Modify: (guild_id: string, params: {
        enabled?: boolean | null;
        welcome_channels?: types.WelcomeScreenChannel[] | null;
        description?: string | null;
    }, requestOptions?: RequestOptions) =>
        Request<types.WelcomeScreen>(METHODS.PATCH, Path(PATHS.guilds, guild_id, PATHS.welcome_screen), requestOptions, params),
};

export const Invite = {
    Create: (channel_id: string, params: {
        max_age?: number;
        max_uses?: number;
        temporary?: boolean;
        unique?: boolean;
        target_type?: helpers.InviteTargetTypes;
        target_user_id?: string;
        target_application_id?: string;
    }, requestOptions?: RequestOptions) =>
        Request<types.Invite>(METHODS.POST, Path(PATHS.channels, channel_id, PATHS.invites), requestOptions, params),

    Get: (invite_code: string, params?: {
        with_counts?: boolean;
        with_expiration?: boolean;
        guild_scheduled_event_id?: string;
    }, requestOptions?: RequestOptions) =>
        Request<types.Invite>(METHODS.GET, Path(PATHS.invites, invite_code) + Query(params), requestOptions),

    Delete: (invite_code: string, requestOptions?: RequestOptions) =>
        Request<types.Invite>(METHODS.DELETE, Path(PATHS.invites, invite_code), requestOptions),
};

export const Template = {
    Get: (template_code: string, requestOptions?: RequestOptions) =>
        Request<types.Template>(METHODS.GET, Path(PATHS.guilds, PATHS.templates, template_code), requestOptions),

    Create: (guild_id: string, params: {
        name: string;
        description?: string;
    }, requestOptions?: RequestOptions) =>
        Request<types.Template>(METHODS.POST, Path(PATHS.guilds, guild_id, PATHS.templates), requestOptions, params),

    Sync: (guild_id: string, template_code: string, requestOptions?: RequestOptions) =>
        Request<types.Template>(METHODS.PUT, Path(PATHS.guilds, guild_id, PATHS.templates, template_code), requestOptions),

    Modify: (guild_id: string, template_code: string, params: {
        name?: string;
        description?: string;
    }, requestOptions?: RequestOptions) =>
        Request<types.Template>(METHODS.PATCH, Path(PATHS.guilds, guild_id, PATHS.templates, template_code), requestOptions, params),

    Delete: (guild_id: string, template_code: string, requestOptions?: RequestOptions) =>
        Request<types.Template>(METHODS.DELETE, Path(PATHS.guilds, guild_id, PATHS.templates, template_code), requestOptions),
};

export const User = {
    GetCurrent: (requestOptions?: RequestOptions) =>
        Request<types.User>(METHODS.GET, Path(PATHS.users, PATHS.me), requestOptions),

    Get: (user_id: string, requestOptions?: RequestOptions) =>
        Request<types.User>(METHODS.GET, Path(PATHS.users, user_id), requestOptions),

    ModifyCurrent: (params: {
        username?: string;
        avatar?: string | null;
    }, requestOptions?: RequestOptions) =>
        Request<types.User>(METHODS.PATCH, Path(PATHS.users, PATHS.me), requestOptions, params),

    GetCurrentGuilds: (params?: {
        limit?: number;
    } & ({
        before?: string;
        after?: undefined;
    } | {
        before?: undefined;
        after?: string;
    }), requestOptions?: RequestOptions) =>
        Request<(types.Guild & {
            owner: boolean;
            permissions: string;
        })[]>(METHODS.GET, Path(PATHS.users, PATHS.me, PATHS.guilds) + Query(params), requestOptions),

    GetCurrentMember: (guild_id: string, requestOptions?: RequestOptions) =>
        Request<types.Member>(METHODS.GET, Path(PATHS.users, PATHS.me, PATHS.guilds, guild_id, PATHS.member), requestOptions),

    LeaveGuild: (guild_id: string, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.DELETE, Path(PATHS.users, PATHS.me, PATHS.guilds, guild_id), requestOptions),

    CreateDM: (params: {
        recipient_id: string;
    }, requestOptions?: RequestOptions) =>
        Request<types.DMChannel>(METHODS.POST, Path(PATHS.users, PATHS.me, PATHS.channels), requestOptions, params),

    GetConnections: (requestOptions?: RequestOptions) =>
        Request<types.Connection[]>(METHODS.GET, Path(PATHS.users, PATHS.me, PATHS.connections), requestOptions),
};

export const Voice = {
    ListRegions: (requestOptions?: RequestOptions) =>
        Request<types.VoiceRegion[]>(METHODS.GET, Path(PATHS.voice, PATHS.regions), requestOptions),

    UpdateCurrentState: (guild_id: string, params: {
        channel_id: string;
        suppress?: boolean;
        request_to_speak_timestamp?: string | null;
    }, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.PATCH, Path(PATHS.guilds, guild_id, PATHS.voice_states, PATHS.me), requestOptions, params),

    UpdateUserState: (guild_id: string, user_id: string, params: {
        channel_id: string;
        suppress?: boolean;
    }, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.PATCH, Path(PATHS.guilds, guild_id, PATHS.voice_states, user_id), requestOptions, params),
};

export const Webhook = {
    Create: (channel_id: string, params: {
        name: string;
        avatar?: string | null;
    }, requestOptions?: RequestOptions) =>
        Request<types.Webhook>(METHODS.POST, Path(PATHS.channels, channel_id, PATHS.webhooks), requestOptions, params),

    Get: (webhook_id: string, requestOptions?: RequestOptions) =>
        Request<types.Webhook>(METHODS.GET, Path(PATHS.webhooks, webhook_id), requestOptions),

    GetWithToken: (webhook_id: string, webhook_token: string, requestOptions?: RequestOptions) =>
        Request<types.Webhook>(METHODS.GET, Path(PATHS.webhooks, webhook_id, webhook_token), requestOptions),

    Modify: (webhook_id: string, params: {
        name?: string;
        avatar?: string | null;
        channel_id?: string;
    }, requestOptions?: RequestOptions) =>
        Request<types.Webhook>(METHODS.PATCH, Path(PATHS.webhooks, webhook_id), requestOptions, params),

    ModifyWithToken: (webhook_id: string, webhook_token: string, params: {
        name?: string;
        avatar?: string | null;
    }, requestOptions?: RequestOptions) =>
        Request<types.Webhook>(METHODS.PATCH, Path(PATHS.webhooks, webhook_id, webhook_token), requestOptions, params),

    Delete: (webhook_id: string, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.DELETE, Path(PATHS.webhooks, webhook_id), requestOptions),

    DeleteWithToken: (webhook_id: string, webhook_token: string, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.DELETE, Path(PATHS.webhooks, webhook_id, webhook_token), requestOptions),

    Execute: (webhook_id: string, webhook_token: string, params1: {
        content?: string;
        username?: string;
        avatar_url?: string;
        tts?: string;
        embeds?: types.Embed[];
        allowed_mentions?: types.AllowedMentions;
        components?: types.ActionRow[];
        flags?: helpers.MessageFlags;
    }, params2?: {
        wait?: boolean;
        thread_id?: string;
    }, requestOptions?: RequestOptions) =>
        Request<types.Message | null>(METHODS.POST, Path(PATHS.webhooks, webhook_id, webhook_token) + Query(params2), requestOptions, params1),

    ExecuteSlack: (webhook_id: string, webhook_token: string, params?: {
        thread_id?: string;
        wait?: boolean;
    }, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.POST, Path(PATHS.webhooks, webhook_id, webhook_token, PATHS.slack) + Query(params), requestOptions),

    ExecuteGitHub: (webhook_id: string, webhook_token: string, params?: {
        thread_id?: string;
        wait?: boolean;
    }, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.POST, Path(PATHS.webhooks, webhook_id, webhook_token, PATHS.github) + Query(params), requestOptions),

    GetMessage: (webhook_id: string, webhook_token: string, message_id: string, params?: {
        thread_id?: string;
    }, requestOptions?: RequestOptions) =>
        Request<types.Message>(METHODS.GET, Path(PATHS.webhooks, webhook_id, webhook_token, PATHS.messages, message_id) + Query(params), requestOptions),

    EditMessage: (webhook_id: string, webhook_token: string, message_id: string, params1: {
        content?: string;
        embeds?: types.Embed[];
        allowed_mentions?: types.AllowedMentions;
        components?: types.ActionRow[];
        attachments?: types.Attachment[];
    }, params2?: {
        thread_id?: string;
    }, requestOptions?: RequestOptions) =>
        Request<types.Message>(METHODS.PATCH, Path(PATHS.webhooks, webhook_id, webhook_token, PATHS.messages, message_id) + Query(params2), requestOptions, params1),

    DeleteMessage: (webhook_id: string, webhook_token: string, message_id: string, params?: {
        thread_id?: string;
    }, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.DELETE, Path(PATHS.webhooks, webhook_id, webhook_token, PATHS.messages, message_id) + Query(params), requestOptions),
};

export const Application = {
    GetGlobalCommands: (application_id: string, params?: {
        with_localizations?: boolean;
    }, requestOptions?: RequestOptions) =>
        Request<(types.ApplicationCommand & {
            name_localized?: string;
            description_localized?: string;
        })[]>(METHODS.GET, Path(PATHS.applications, application_id, PATHS.commands) + Query(params), requestOptions),

    CreateGlobalCommand: (application_id: string, params: types.ApplicationCommandBase, requestOptions?: RequestOptions) =>
        Request<types.ApplicationCommand>(METHODS.POST, Path(PATHS.applications, application_id, PATHS.commands), requestOptions, params),

    GetGlobalCommand: (application_id: string, command_id: string, requestOptions?: RequestOptions) =>
        Request<types.ApplicationCommand>(METHODS.GET, Path(PATHS.applications, application_id, PATHS.commands, command_id), requestOptions),

    EditGlobalCommand: (application_id: string, command_id: string, params: Partial<Omit<types.ApplicationCommandBase, 'type'>>, requestOptions?: RequestOptions) =>
        Request<types.ApplicationCommand>(METHODS.PATCH, Path(PATHS.applications, application_id, PATHS.commands, command_id), requestOptions, params),

    DeleteGlobalCommand: (application_id: string, command_id: string, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.DELETE, Path(PATHS.applications, application_id, PATHS.commands, command_id), requestOptions),

    GetGuildCommands: (application_id: string, guild_id: string, params?: {
        with_localizations?: boolean;
    }, requestOptions?: RequestOptions) =>
        Request<(types.ApplicationCommand & {
            name_localized?: string;
            description_localized?: string;
        })[]>(METHODS.GET, Path(PATHS.applications, application_id, PATHS.guilds, guild_id, PATHS.commands) + Query(params), requestOptions),

    BulkOverwriteGlobalCommands: (application_id: string, params: types.ApplicationCommandBase[], requestOptions?: RequestOptions) =>
        Request<types.ApplicationCommand[]>(METHODS.PUT, Path(PATHS.applications, application_id, PATHS.commands), requestOptions, params),

    CreateGuildCommand: (application_id: string, guild_id: string, params: types.ApplicationCommandBase, requestOptions?: RequestOptions) =>
        Request<types.ApplicationCommand>(METHODS.POST, Path(PATHS.applications, application_id, PATHS.guilds, guild_id, PATHS.commands), requestOptions, params),

    GetGuildCommand: (application_id: string, guild_id: string, command_id: string, requestOptions?: RequestOptions) =>
        Request<types.ApplicationCommand>(METHODS.GET, Path(PATHS.applications, application_id, PATHS.guilds, guild_id, PATHS.commands, command_id), requestOptions),

    EditGuildCommand: (application_id: string, guild_id: string, command_id: string, params: Partial<Omit<types.ApplicationCommandBase, 'type'>>, requestOptions?: RequestOptions) =>
        Request<types.ApplicationCommand>(METHODS.PATCH, Path(PATHS.applications, application_id, PATHS.guilds, guild_id, PATHS.commands, command_id), requestOptions, params),

    DeleteGuildCommand: (application_id: string, guild_id: string, command_id: string, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.DELETE, Path(PATHS.applications, application_id, PATHS.guilds, guild_id, PATHS.commands, command_id), requestOptions),

    BulkOverwriteGuildCommands: (application_id: string, guild_id: string, params: types.ApplicationCommandBase[], requestOptions?: RequestOptions) =>
        Request<types.ApplicationCommand[]>(METHODS.PUT, Path(PATHS.applications, application_id, PATHS.guilds, guild_id, PATHS.commands), requestOptions, params),

    GetGuildCommandPermissions: (application_id: string, guild_id: string, requestOptions?: RequestOptions) =>
        Request<types.GuildApplicationCommandPermissions[]>(METHODS.GET, Path(PATHS.applications, application_id, PATHS.guilds, guild_id, PATHS.commands, PATHS.permissions), requestOptions),

    GetCommandPermissions: (application_id: string, guild_id: string, command_id: string, requestOptions?: RequestOptions) =>
        Request<types.GuildApplicationCommandPermissions>(METHODS.GET, Path(PATHS.applications, application_id, PATHS.guilds, guild_id, PATHS.commands, command_id, PATHS.permissions), requestOptions),

    EditCommandPermissions: (application_id: string, guild_id: string, command_id: string, params: {
        permissions: types.ApplicationCommandPermissions[];
    }, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.PUT, Path(PATHS.applications, application_id, PATHS.guilds, guild_id, PATHS.commands, command_id, PATHS.permissions), requestOptions, params),

    BatchEditCommandPermissions: (application_id: string, guild_id: string, params: {
        id: string;
        permissions: types.ApplicationCommandPermissions[];
    }[], requestOptions?: RequestOptions) =>
        Request<types.GuildApplicationCommandPermissions[]>(METHODS.PUT, Path(PATHS.applications, application_id, PATHS.guilds, guild_id, PATHS.commands, PATHS.permissions), requestOptions, params),

    CreateInteractionResponse: (interaction_id: string, interaction_token: string, params: types.InteractionResponse, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.POST, Path(PATHS.interactions, interaction_id, interaction_token, PATHS.callback), requestOptions, params),

    GetOriginalInteractionResponse: (application_id: string, interaction_token: string, requestOptions?: RequestOptions) =>
        Request<types.Message>(METHODS.GET, Path(PATHS.webhooks, application_id, interaction_token, PATHS.messages, PATHS.original), requestOptions),

    EditOriginalInteractionResponse: (application_id: string, interaction_token: string, params: {
        content?: string;
        embeds?: types.Embed[];
        allowed_mentions?: types.AllowedMentions;
        components?: types.ActionRow[];
    }, requestOptions?: RequestOptions) =>
        Request<types.Message>(METHODS.PATCH, Path(PATHS.webhooks, application_id, interaction_token, PATHS.messages, PATHS.original), requestOptions, params),

    DeleteOriginalInteractionResponse: (application_id: string, interaction_token: string, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.DELETE, Path(PATHS.webhooks, application_id, interaction_token, PATHS.messages, PATHS.original), requestOptions),

    CreateFollowupMessage: (application_id: string, interaction_token: string, params: {
        content?: string;
        username?: string;
        avatar_url?: string;
        tts?: string;
        embeds?: types.Embed[];
        allowed_mentions?: types.AllowedMentions;
        flags?: helpers.MessageFlags;
        components?: types.ActionRow[];
    }, requestOptions?: RequestOptions) =>
        Request<types.Message | null>(METHODS.POST, Path(PATHS.webhooks, application_id, interaction_token), requestOptions, params),

    GetFollowupMessage: (application_id: string, interaction_token: string, message_id: string, requestOptions?: RequestOptions) =>
        Request<types.Message>(METHODS.GET, Path(PATHS.webhooks, application_id, interaction_token, PATHS.messages, message_id), requestOptions),

    EditFollowupMessage: (application_id: string, interaction_token: string, message_id: string, params: {
        content?: string;
        embeds?: types.Embed[];
        allowed_mentions?: types.AllowedMentions;
        components?: types.ActionRow[];
    }, requestOptions?: RequestOptions) =>
        Request<types.Message>(METHODS.PATCH, Path(PATHS.webhooks, application_id, interaction_token, PATHS.messages, message_id), requestOptions, params),

    DeleteFollowupMessage: (application_id: string, interaction_token: string, message_id: string, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.DELETE, Path(PATHS.webhooks, application_id, interaction_token, PATHS.messages, message_id), requestOptions),
};

export const OAuth2 = {
    TokenExchange: (params: ({
        client_id: string;
        client_secret: string;
        redirect_uri: string;
        scope: helpers.OAuth2Scopes | string;
    } & ({
        grant_type: helpers.OAuth2GrantTypes.AUTHORIZATION_CODE;
        code: string;
    } | {
        grant_type: helpers.OAuth2GrantTypes.REFRESH_TOKEN;
        refresh_token: string;
    })), requestOptions?: RequestOptions) =>
        Request<{
            access_token: string;
            token_type: helpers.TokenTypes.BEARER;
            expires_in: number;
            refresh_token: string;
            scope: helpers.OAuth2Scopes | string;
        }>(METHODS.POST, Path(PATHS.oauth2, PATHS.token), requestOptions, Param(params)),

    GetCurrentApplicationInformation: (requestOptions?: RequestOptions) =>
        Request<types.Application>(METHODS.GET, Path(PATHS.oauth2, PATHS.applications, PATHS.me), requestOptions),

    GetCurrentAuthorizationInformation: (requestOptions?: RequestOptions) =>
        Request<{
            application: types.Application,
            scopes: string[];
            expires: string;
            user?: types.User;
        }>(METHODS.GET, Path(PATHS.oauth2, PATHS.me), requestOptions),
};

export const Thread = {
    Modify: (thread_id: string, params: {
        name?: string;
        archived?: boolean;
        auto_archive_duration?: helpers.ThreadArchiveDurations;
        locked?: boolean;
        invitable?: boolean;
        rate_limit_per_user?: number | null;
    }, requestOptions?: RequestOptions) =>
        Request<types.Thread>(METHODS.PATCH, Path(PATHS.channels, thread_id), requestOptions, params),

    Delete: (thread_id: string, requestOptions?: RequestOptions) =>
        Request<types.Thread>(METHODS.DELETE, Path(PATHS.channels, thread_id), requestOptions),

    StartWithMessage: (channel_id: string, message_id: string, params: {
        name: string;
        auto_archive_duration?: helpers.ThreadArchiveDurations;
        rate_limit_per_user?: number | null;
    }, requestOptions?: RequestOptions) =>
        Request<types.Thread>(METHODS.POST, Path(PATHS.channels, channel_id, PATHS.messages, message_id, PATHS.threads), requestOptions, params),

    Start: (channel_id: string, params: {
        name: string;
        auto_archive_duration?: helpers.ThreadArchiveDurations;
        type?: helpers.ChannelTypes.GUILD_PRIVATE_THREAD | helpers.ChannelTypes.GUILD_PUBLIC_THREAD | helpers.ChannelTypes.GUILD_NEWS_THREAD;
        invitable?: boolean;
        rate_limit_per_user?: number | null;
    }, requestOptions?: RequestOptions) =>
        Request<types.Thread>(METHODS.POST, Path(PATHS.channels, channel_id, PATHS.threads), requestOptions, params),

    Join: (thread_id: string, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.PUT, Path(PATHS.channels, thread_id, PATHS.thread_members, PATHS.me), requestOptions),

    AddMember: (thread_id: string, user_id: string, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.PUT, Path(PATHS.channels, thread_id, PATHS.thread_members, user_id), requestOptions),

    Leave: (thread_id: string, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.DELETE, Path(PATHS.channels, thread_id, PATHS.thread_members, PATHS.me), requestOptions),

    RemoveMember: (thread_id: string, user_id: string, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.DELETE, Path(PATHS.channels, thread_id, PATHS.thread_members, user_id), requestOptions),

    GetMember: (thread_id: string, user_id: string, requestOptions?: RequestOptions) =>
        Request<types.ThreadMember>(METHODS.GET, Path(PATHS.channels, thread_id, PATHS.thread_members, user_id), requestOptions),

    ListMembers: (thread_id: string, requestOptions?: RequestOptions) =>
        Request<types.ThreadMember[]>(METHODS.GET, Path(PATHS.channels, thread_id, PATHS.thread_members), requestOptions),
};

export const StageInstance = {
    Create: (params: {
        channel_id: string;
        topic: string;
        privacy_level?: helpers.PrivacyLevels;
        send_start_notification?: boolean;
    }, requestOptions?: RequestOptions) =>
        Request<types.StageInstance>(METHODS.POST, PATHS.stage_instances, requestOptions, params),

    Get: (channel_id: string, requestOptions?: RequestOptions) =>
        Request<types.StageInstance>(METHODS.GET, Path(PATHS.stage_instances, channel_id), requestOptions),

    Modify: (channel_id: string, params: {
        topic?: string;
        privacy_level?: helpers.PrivacyLevels;
    }, requestOptions?: RequestOptions) =>
        Request<types.StageInstance>(METHODS.PATCH, Path(PATHS.stage_instances, channel_id), requestOptions, params),

    Delete: (channel_id: string, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.DELETE, Path(PATHS.stage_instances, channel_id), requestOptions),
};

export const Sticker = {
    Get: (sticker_id: string, requestOptions?: RequestOptions) =>
        Request<types.Sticker>(METHODS.GET, Path(PATHS.stickers, sticker_id), requestOptions),

    GetFromGuild: (guild_id: string, sticker_id: string, requestOptions?: RequestOptions) =>
        Request<types.Sticker>(METHODS.GET, Path(PATHS.guilds, guild_id, PATHS.stickers, sticker_id), requestOptions),

    // Create: TODO

    Modify: (guild_id: string, sticker_id: string, params: {
        name?: string;
        description?: string | null;
        tags?: string;
    }, requestOptions?: RequestOptions) =>
        Request<types.Sticker>(METHODS.PATCH, Path(PATHS.guilds, guild_id, PATHS.stickers, sticker_id), requestOptions, params),

    Delete: (guild_id: string, sticker_id: string, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.DELETE, Path(PATHS.guilds, guild_id, PATHS.stickers, sticker_id), requestOptions),
};

export const StickerPacks = {
    ListNitro: (requestOptions?: RequestOptions) =>
        Request<{ sticker_packs: types.StickerPack[]; }>(METHODS.GET, PATHS.sticker_packs, requestOptions),
};

export const ScheduledEvent = {
    Create: (guild_id: string, params: {
        channel_id?: string;
        entity_metadata?: types.ScheduledEventEntityMetadata;
        name: string;
        privacy_level: helpers.PrivacyLevels;
        scheduled_start_time: string;
        scheduled_end_time?: string;
        description?: string;
        entity_type: helpers.ScheduledEventEntityTypes;
        image?: string;
    }, requestOptions?: RequestOptions) =>
        Request<types.ScheduledEvent>(METHODS.POST, Path(PATHS.guilds, guild_id, PATHS.scheduled_events), requestOptions, params),

    Get: (guild_id: string, event_id: string, params?: {
        with_user_count?: boolean;
    }, requestOptions?: RequestOptions) =>
        Request<types.ScheduledEvent>(METHODS.GET, Path(PATHS.guilds, guild_id, PATHS.scheduled_events, event_id) + Query(params), requestOptions),

    Modify: (guild_id: string, event_id: string, params: {
        channel_id?: string | null;
        entity_metadata?: types.ScheduledEventEntityMetadata | null;
        name?: string;
        privacy_level?: helpers.PrivacyLevels;
        scheduled_start_time?: string;
        scheduled_end_time?: string;
        description?: string | null;
        entity_type?: helpers.ScheduledEventEntityTypes;
        status?: helpers.ScheduledEventStatuses;
        image?: string | null;
    }, requestOptions?: RequestOptions) =>
        Request<types.ScheduledEvent>(METHODS.PATCH, Path(PATHS.guilds, guild_id, PATHS.scheduled_events, event_id), requestOptions, params),

    Delete: (guild_id: string, event_id: string, requestOptions?: RequestOptions) =>
        Request<null>(METHODS.DELETE, Path(PATHS.guilds, guild_id, PATHS.scheduled_events, event_id), requestOptions),

    GetUsers: (guild_id: string, event_id: string, params?: {
        limit?: number;
        with_member?: boolean;
    } & ({
        before?: string;
        after?: undefined;
    } | {
        before?: undefined;
        after?: string;
    }), requestOptions?: RequestOptions) =>
        Request<types.ScheduledEventUser[]>(METHODS.GET, Path(PATHS.guilds, guild_id, PATHS.scheduled_events, event_id, PATHS.users) + Query(params), requestOptions),
};
